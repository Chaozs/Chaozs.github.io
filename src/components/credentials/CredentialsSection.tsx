import React, { useState } from "react";
import SectionShell from "../shared/SectionShell";
import SectionHeader from "../shared/SectionHeader";
import SurfaceCard from "../shared/SurfaceCard";
import AppIcon from "../shared/AppIcon";
import { educationContent, certifications } from "../../content";
import type { Education, Certification } from "../../content";

// ─── Education Card ──────────────────────────────────────────────────────────

const EducationCard: React.FC<Education> = ({
  institution,
  degree,
  field,
  date,
  highlights = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="col-md-12 cred-entry">
      <div className={`cred-box ${isOpen ? "is-expanded" : "is-collapsed"}`}>
        <SurfaceCard className="cred-dossier">
          <div className="cred-dossier__header">
            <div className="cred-dossier__identity">
              <div className="cred-dossier__eyebrow">Academic Record</div>
              <h2 className="cred-dossier__title">{institution}</h2>
              <div className="work-dossier__status-group work-dossier__status-group--inline">
                <span className="work-status-chip work-status-chip--open">{field}</span>
                <span className="work-status-chip work-status-chip--role">{degree}</span>
                <span className="work-date">{date}</span>
              </div>
            </div>
            {highlights.length > 0 && (
              <button
                type="button"
                className="work-dossier__toggle"
                onClick={() => setIsOpen((v) => !v)}
                aria-expanded={isOpen}
              >
                <span className="work-dossier__toggle-icon" aria-hidden="true">
                  <AppIcon name={isOpen ? "chevron-up" : "chevron-down"} />
                </span>
                <span className="work-dossier__toggle-label">
                  {isOpen ? "Seal Record" : "Open Record"}
                </span>
              </button>
            )}
          </div>
          <div className="cred-dossier__body">
            <ul className="cred-dossier__highlights" aria-label="Education highlights">
              {highlights.map((item, i) => (
                <li
                  key={i}
                  className="cred-highlight-item work-detail-item"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="cred-highlight-bullet" aria-hidden="true">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </SurfaceCard>
      </div>
    </article>
  );
};

// ─── Certification Card ───────────────────────────────────────────────────────

const CertCard: React.FC<Certification> = ({
  name,
  issuer,
  date,
  credentialId,
  credentialUrl,
}) => (
  <article className="col-lg-4 col-md-6 cert-entry">
    <SurfaceCard className="cert-card">
      <div className="cert-card__badge">
        <span className="work-status-chip work-status-chip--locked">Certified</span>
      </div>
      <div className="cert-card__name">{name}</div>
      <div className="cert-card__issuer">{issuer}</div>
      <div className="cert-card__meta">
        <span className="work-date">{date}</span>
        {credentialId && (
          <span className="cert-card__id">
            <span className="cert-card__id-label">ID</span>
            {credentialId}
          </span>
        )}
      </div>
      {credentialUrl && (
        <a
          className="cert-card__link"
          href={credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Verify credential: ${name}`}
        >
          <span className="cert-card__link-icon" aria-hidden="true">
            <AppIcon name="arrow-right" />
          </span>
          Verify credential
        </a>
      )}
    </SurfaceCard>
  </article>
);

// ─── Section ──────────────────────────────────────────────────────────────────

const CredentialsSection: React.FC = () => (
  <SectionShell id="credentials" className="sect-pt4">
    <div className="row">
      <div className="col-sm-12">
        <SectionHeader command="load credentials dossier" />
      </div>
    </div>

    <div className="row">
      <div className="col-12">
        <div className="cred-section-label">Education</div>
      </div>
      {educationContent.map((edu) => (
        <EducationCard key={`${edu.institution}-${edu.date}`} {...edu} />
      ))}
    </div>

    {certifications.length > 0 && (
      <div className="row cred-section-row">
        <div className="col-12">
          <div className="cred-section-label">Certifications</div>
        </div>
        {certifications.map((cert) => (
          <CertCard key={`${cert.name}-${cert.issuer}`} {...cert} />
        ))}
      </div>
    )}
  </SectionShell>
);

export default CredentialsSection;
