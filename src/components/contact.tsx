import React from "react";
import SectionShell from "./shared/SectionShell";
import { ContactInput, ContactTextarea } from "./shared/ContactField";
import SectionHeader from "./shared/SectionHeader";
import SurfaceCard from "./shared/SurfaceCard";

const Contact: React.FC = () => {
  return (
    <SectionShell
      id="contact"
      className="sect-pt4 contact-section"
      containerPadding="35px"
    >
      <div className="row">
        <div className="col-sm-12">
          <SectionHeader command="open comms relay" />
        </div>
      </div>
      <div className="contact-dossier contact-dossier--open">
        <div className="contact-dossier__content">
          <SurfaceCard className="contact-dossier__card" padding="15px">
            <div className="contact-dossier__body">
              <section className="contact-form-panel">
                <div className="contact-panel-heading">
                  <div className="contact-panel-heading__eyebrow">Outbound Transmission</div>
                  <h5 className="contact-panel-heading__title">Compose Signal</h5>
                </div>
                <div className="contact-form-shell">
                  <form
                    action="https://formspree.io/f/myzyanen"
                    method="POST"
                    className="contactForm"
                  >
                    <div id="sendmessage">
                      Thanks for reaching out! I'll try my best to reply within 2 business days.
                    </div>
                    <div id="errormessage"></div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <ContactInput
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Your Name"
                          dataRule="minlen:4"
                          dataMsg="Please enter at least 4 chars"
                        />
                      </div>
                      <div className="col-md-12 mb-3">
                        <ContactInput
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Your Email"
                          dataRule="email"
                          dataMsg="Please enter a valid email"
                        />
                      </div>
                      <div className="col-md-12 mb-3">
                        <ContactInput
                          type="text"
                          name="subject"
                          id="subject"
                          placeholder="Subject"
                          dataRule="minlen:4"
                          dataMsg="Please enter at least 8 chars of subject"
                        />
                      </div>
                      <div className="col-md-12 mb-3">
                        <ContactTextarea
                          name="message"
                          id="message"
                          placeholder="Message"
                          dataRule="required"
                          dataMsg="Please write something for us"
                        />
                      </div>
                      <div className="col-md-12">
                        <button
                          type="submit"
                          className="button button-a button-big button-rouded"
                        >
                          Transmit Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </section>
              <section className="contact-alt-channel" aria-label="External relays">
                <div className="contact-panel-heading contact-panel-heading--secondary">
                  <div className="contact-panel-heading__content">
                    <div className="contact-panel-heading__eyebrow">Alternate Channels</div>
                    <h5 className="contact-panel-heading__title">External Relays</h5>
                  </div>
                  <div className="contact-relay-links">
                    <a
                      className="contact-relay-link"
                      href="https://www.linkedin.com/in/thien-trandinh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open LinkedIn Channel"
                    >
                      <span className="contact-relay-link__label">LinkedIn</span>
                      <span className="contact-relay-link__icon" aria-hidden="true">
                        <i className="ion-social-linkedin"></i>
                      </span>
                    </a>
                    <a
                      className="contact-relay-link"
                      href="https://github.com/Chaozs"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open GitHub Profile"
                    >
                      <span className="contact-relay-link__label">GitHub</span>
                      <span className="contact-relay-link__icon" aria-hidden="true">
                        <i className="fa fa-github"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </SurfaceCard>
        </div>
      </div>
    </SectionShell>
  );
};

export default Contact;
