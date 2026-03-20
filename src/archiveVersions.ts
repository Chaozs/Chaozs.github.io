export type ArchiveVersion = {
  /** Folder name under public/archive/ — must match the directory exactly */
  id: string;
  /** Label shown in the version picker dropdown and archive banner */
  label: string;
  /** Optional date string shown alongside the label */
  date?: string;
};

/**
 * List of available archive snapshots.
 * Keep this empty until the archive has been built and committed.
 * Add entries here once public/archive/<id>/ exists in the repo.
 */
export const ARCHIVE_VERSIONS: ArchiveVersion[] = [
  { id: "v1", label: "Original Build", date: "Jan 2025" },
  { id: "v2", label: "Initial Matrix Theme", date: "Feb 2026" },
];
