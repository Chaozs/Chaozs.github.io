<#
.SYNOPSIS
  Builds an archived snapshot of the site at a given git commit.

.DESCRIPTION
  Stashes local changes (excluding public/archive/), checks out the target commit,
  auto-detects Vite vs Create React App, builds with the correct base path,
  stages output in a TEMP directory outside the repo, returns to the original
  branch, then copies the fresh build into public/archive/<VersionId>/.

.PARAMETER Commit
  Git commit SHA or ref to build (e.g. "dc9ee29").

.PARAMETER VersionId
  Archive folder name (e.g. "v1"). Output goes to public/archive/<VersionId>/.

.PARAMETER Label
  Human-readable label shown in the version picker and banner (e.g. "Classic").

.PARAMETER Date
  Optional date string shown in the banner (e.g. "Jan 2025").

.EXAMPLE
  .\scripts\build-archive.ps1 -Commit dc9ee29 -VersionId v1 -Label "Classic" -Date "Jan 2025"
  .\scripts\build-archive.ps1 -Commit 5e9ee37 -VersionId v2 -Label "Pre-Redesign" -Date "Mar 2026"
#>
param(
    [Parameter(Mandatory = $true)]  [string]$Commit,
    [Parameter(Mandatory = $true)]  [string]$VersionId,
    [Parameter(Mandatory = $false)] [string]$Label = "",
    [Parameter(Mandatory = $false)] [string]$Date  = ""
)

$repoRoot   = Split-Path $PSScriptRoot -Parent
$archiveDir = Join-Path $repoRoot "public\archive\$VersionId"
$tempDir    = Join-Path $env:TEMP "chaozs-archive-$VersionId"

$originalBranch = git -C $repoRoot symbolic-ref --short HEAD 2>$null
if (-not $originalBranch) { $originalBranch = "master" }

Write-Host ""
Write-Host "Building archive '$VersionId' from commit $Commit" -ForegroundColor Magenta
Write-Host "-------------------------------------------------" -ForegroundColor DarkGray

# Step 1: Stash local changes, but EXCLUDE public/archive/ so previously-built
#   archives are not stashed and cannot be wrongly restored on stash pop.
Write-Host "[1/7] Stashing uncommitted changes (excluding public/archive)..." -ForegroundColor Cyan
git -C $repoRoot stash push --include-untracked -m "archive-build-$VersionId" `
    -- ":(exclude)public/archive" 2>$null
$didStash = ($LASTEXITCODE -eq 0)
if ($didStash) {
    Write-Host "  Stashed OK." -ForegroundColor DarkGray
} else {
    Write-Host "  Nothing to stash." -ForegroundColor DarkGray
    $didStash = $false
}

# Step 2: Checkout target commit
Write-Host "[2/7] Checking out $Commit..." -ForegroundColor Cyan
git -C $repoRoot checkout $Commit 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ERROR: Could not check out '$Commit'. Restoring state..." -ForegroundColor Red
    git -C $repoRoot checkout -f $originalBranch 2>$null
    if ($didStash) { git -C $repoRoot stash pop 2>$null }
    exit 1
}

# Step 3: Detect build system
Write-Host "[3/7] Detecting build system..." -ForegroundColor Cyan
$pkgJson     = Get-Content (Join-Path $repoRoot "package.json") -Raw | ConvertFrom-Json
$buildScript = $pkgJson.scripts.build
$isVite      = $buildScript -match "vite"
$isCRA       = $buildScript -match "react-scripts"

if ($isVite) {
    Write-Host "  Vite detected." -ForegroundColor Green
    $distDir = Join-Path $repoRoot "dist"
} elseif ($isCRA) {
    Write-Host "  Create React App detected." -ForegroundColor Green
    $distDir = Join-Path $repoRoot "build"
} else {
    Write-Host "  WARNING: Unknown build system. Assuming output is 'build/'." -ForegroundColor Yellow
    $distDir = Join-Path $repoRoot "build"
}

# Step 4: Install dependencies for this commit
Write-Host "[4/7] Installing dependencies..." -ForegroundColor Cyan
npm --prefix $repoRoot install --prefer-offline --silent

# Step 5: Clean previous output and build with correct base path.
#   For Vite: temporarily patch vite.config.ts to inject base: '...'
#     (CLI --base flag is unreliable on Windows via the .cmd wrapper)
#   For CRA:  set PUBLIC_URL env var before build.
Write-Host "[5/7] Building with base path /archive/$VersionId/..." -ForegroundColor Cyan
if (Test-Path $distDir) {
    Remove-Item $distDir -Recurse -Force
    Write-Host "  Cleaned previous build output." -ForegroundColor DarkGray
}

if ($isVite) {
    $viteConfigPath = Join-Path $repoRoot "vite.config.ts"
    $origConfig     = [System.IO.File]::ReadAllText($viteConfigPath, [System.Text.Encoding]::UTF8)
    $patchedConfig  = $origConfig -replace '(?s)(defineConfig\(\{)', "defineConfig({`n  base: '/archive/$VersionId/',"
    [System.IO.File]::WriteAllText($viteConfigPath, $patchedConfig, [System.Text.Encoding]::UTF8)
    Write-Host "  Patched vite.config.ts with base: '/archive/$VersionId/'." -ForegroundColor DarkGray
    npm --prefix $repoRoot run build
    [System.IO.File]::WriteAllText($viteConfigPath, $origConfig, [System.Text.Encoding]::UTF8)
    Write-Host "  Restored vite.config.ts." -ForegroundColor DarkGray
} else {
    $env:PUBLIC_URL = "/archive/$VersionId"
    npm --prefix $repoRoot run build
    $env:PUBLIC_URL = ""
}

if (-not (Test-Path $distDir)) {
    Write-Host "  ERROR: Build output not found at $distDir" -ForegroundColor Red
    git -C $repoRoot checkout -f $originalBranch 2>$null
    npm --prefix $repoRoot install --prefer-offline --silent
    if ($didStash) { git -C $repoRoot stash pop 2>$null }
    exit 1
}

# Step 6: Stage build in TEMP (outside the repo) and inject archive banner.
#   We CANNOT copy to public/archive/$VersionId/ here because git checkout -f
#   master (step 7) would restore the committed version of that directory,
#   overwriting the fresh build. We stage in temp first, copy after returning.
Write-Host "[6/7] Staging build in temp and injecting banner..." -ForegroundColor Cyan
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
Copy-Item $distDir $tempDir -Recurse
Write-Host "  Staged to $tempDir" -ForegroundColor DarkGray

$tempIndexPath = Join-Path $tempDir "index.html"
$bannerLabel   = if ($Label) { $Label } else { $VersionId }
$bannerDate    = if ($Date) { " - <strong style=`"color:#e6e7e9`">$Date</strong>" } else { "" }
$banner = "<div id=`"archive-banner`" style=`"position:fixed;bottom:0;left:0;right:0;z-index:99999;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;padding:10px 20px;background:#0b0e10;border-top:1px solid rgba(59,209,111,0.35);font-family:'Fira Code',monospace;font-size:0.75rem;color:#9fa6ad;box-shadow:0 -4px 20px rgba(0,0,0,0.4);`"><div style=`"display:flex;align-items:center;gap:10px;min-width:0;`"><span style=`"flex-shrink:0;color:#3bd16f;font-weight:700;letter-spacing:0.12em;padding:2px 8px;border:1px solid rgba(59,209,111,0.4);border-radius:4px;`">ARCHIVE</span><span>Viewing <strong style=`"color:#e6e7e9;`">$bannerLabel</strong>$bannerDate - a historical snapshot.</span></div><div style=`"display:flex;align-items:center;gap:10px;flex-shrink:0;`"><a href=`"/`" style=`"color:#3bd16f;font-weight:700;letter-spacing:0.08em;text-decoration:none;padding:4px 14px;border:1px solid rgba(59,209,111,0.5);border-radius:6px;white-space:nowrap;`">Current Site</a><button onclick=`"document.getElementById('archive-banner').remove()`" style=`"background:none;border:none;color:#9fa6ad;cursor:pointer;font-size:1rem;padding:2px 4px;line-height:1;`" aria-label=`"Dismiss`">x</button></div></div>"

if (Test-Path $tempIndexPath) {
    $content = [System.IO.File]::ReadAllText($tempIndexPath, [System.Text.Encoding]::UTF8)
    $content = $content -replace '(?i)</body>', "$banner`n</body>"
    [System.IO.File]::WriteAllText($tempIndexPath, $content, [System.Text.Encoding]::UTF8)
    Write-Host "  Archive banner injected." -ForegroundColor Green
} else {
    Write-Host "  WARNING: index.html not found in build output." -ForegroundColor Yellow
}

# Step 7: Return to original branch, restore deps + stash, THEN copy from temp.
Write-Host "[7/7] Returning to $originalBranch..." -ForegroundColor Cyan
git -C $repoRoot checkout -f $originalBranch 2>$null
Write-Host "  Restoring master dependencies..." -ForegroundColor DarkGray
npm --prefix $repoRoot install --prefer-offline --silent
if ($didStash) {
    Write-Host "  Restoring stashed changes..." -ForegroundColor DarkGray
    git -C $repoRoot stash pop 2>$null
}

Write-Host "  Copying fresh build to public/archive/$VersionId/..." -ForegroundColor Cyan
if (Test-Path $archiveDir) {
    Remove-Item $archiveDir -Recurse -Force
    Write-Host "  Removed previous archive." -ForegroundColor DarkGray
}
Copy-Item $tempDir $archiveDir -Recurse
Remove-Item $tempDir -Recurse -Force
Write-Host "  Temp directory cleaned up." -ForegroundColor DarkGray

Write-Host ""
Write-Host "[DONE] Archive '$VersionId' ready at public/archive/$VersionId/" -ForegroundColor Green
Write-Host ""
Write-Host "Verify paths:" -ForegroundColor Yellow
Write-Host "  Select-String -Path public\archive\$VersionId\index.html -Pattern 'assets/'" -ForegroundColor Yellow
Write-Host ""
