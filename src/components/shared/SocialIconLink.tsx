import React from "react";

type SocialIconLinkProps = {
  href: string;
  iconClass: string;
  label?: string;
};

const SocialIconLink: React.FC<SocialIconLinkProps> = ({ href, iconClass, label }) => (
  <div className="socials">
    <ul>
      <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            className="ico-circle"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i className={iconClass}></i>
          </span>
        </a>
      </span>
    </ul>
  </div>
);

export default SocialIconLink;
