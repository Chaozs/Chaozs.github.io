import React, { useState } from "react";
import AppIcon from "../shared/AppIcon";
import SectionShell from "../shared/SectionShell";
import { ContactInput, ContactTextarea } from "../shared/ContactField";
import SectionHeader from "../shared/SectionHeader";
import SurfaceCard from "../shared/SurfaceCard";

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const validateField = (field: keyof ContactFormValues, value: string): string => {
  const trimmedValue = value.trim();

  switch (field) {
    case "name":
      if (!trimmedValue) return "Please enter your name.";
      if (trimmedValue.length < 2) return "Name should be at least 2 characters.";
      return "";
    case "email":
      if (!trimmedValue) return "Please enter your email.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) return "Please enter a valid email address.";
      return "";
    case "subject":
      if (!trimmedValue) return "Please enter a subject.";
      if (trimmedValue.length < 4) return "Subject should be at least 4 characters.";
      return "";
    case "message":
      if (!trimmedValue) return "Please write a message.";
      if (trimmedValue.length < 10) return "Message should be at least 10 characters.";
      return "";
    default:
      return "";
  }
};

const validateForm = (values: ContactFormValues): ContactFormErrors => {
  return {
    name: validateField("name", values.name),
    email: validateField("email", values.email),
    subject: validateField("subject", values.subject),
    message: validateField("message", values.message),
  };
};

const Contact: React.FC = () => {
  const [formValues, setFormValues] = useState<ContactFormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof ContactFormValues, boolean>>>({});

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const field = name as keyof ContactFormValues;

    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (touchedFields[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }));
    }
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const field = name as keyof ContactFormValues;

    setTouchedFields((prev) => ({
      ...prev,
      [field]: true,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value),
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const nextErrors = validateForm(formValues);
    const hasErrors = Object.values(nextErrors).some(Boolean);

    if (hasErrors) {
      event.preventDefault();
      setFormErrors(nextErrors);
      setTouchedFields({
        name: true,
        email: true,
        subject: true,
        message: true,
      });
    }
  };

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
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <div className="contact-form-grid">
                      <div className="contact-form-field">
                        <ContactInput
                          label="Your name"
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Your Name"
                          value={formValues.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touchedFields.name ? formErrors.name : ""}
                          required
                          minLength={2}
                          autoComplete="name"
                        />
                      </div>
                      <div className="contact-form-field">
                        <ContactInput
                          label="Your email"
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Your Email"
                          value={formValues.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touchedFields.email ? formErrors.email : ""}
                          required
                          autoComplete="email"
                        />
                      </div>
                      <div className="contact-form-field">
                        <ContactInput
                          label="Subject"
                          type="text"
                          name="subject"
                          id="subject"
                          placeholder="Subject"
                          value={formValues.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touchedFields.subject ? formErrors.subject : ""}
                          required
                          minLength={4}
                          autoComplete="off"
                        />
                      </div>
                      <div className="contact-form-field">
                        <ContactTextarea
                          label="Message"
                          name="message"
                          id="message"
                          placeholder="Message"
                          value={formValues.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touchedFields.message ? formErrors.message : ""}
                          required
                          minLength={10}
                        />
                      </div>
                      <div className="contact-form-actions">
                        <button
                          type="submit"
                          className="contact-submit-button"
                        >
                          <span className="contact-submit-button__meta">Send</span>
                          <span className="contact-submit-button__label">Transmit Message</span>
                          <span className="contact-submit-button__icon" aria-hidden="true">
                            <AppIcon name="paper-plane" />
                          </span>
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
                        <AppIcon name="linkedin" />
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
                        <AppIcon name="github" />
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
