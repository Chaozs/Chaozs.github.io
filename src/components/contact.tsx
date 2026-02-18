import React from "react";
import SectionShell from "./shared/SectionShell";
import { ContactInput, ContactTextarea } from "./shared/ContactField";
import SocialIconLink from "./shared/SocialIconLink";
import SurfaceCard from "./shared/SurfaceCard";

const Contact: React.FC = () => {
  return (
    <SectionShell
      id="contact"
      className="portfolio-mf sect-pt4 route"
      containerPadding="35px"
      after={(
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="copyright-box">
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    >
        <div className="row">
          <SurfaceCard className="col-sm-12" padding="15px">
            <div className="contact-mf">
              <div className="contact-inner">
                <div className="row">
                  <div className="col-md-6 contact-form-col">
                    <div className="title-box-2">
                      <h5 className="title-left" style={{ color: "var(--text-heading)" }}>Send A Message</h5>
                    </div>
                    <div>
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
                              Send Message
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="title-box-2 pt-4 pt-md-0">
                      <h5 className="title-left" style={{ color: "var(--text-heading)" }}>
                        <SocialIconLink
                          href="https://www.linkedin.com/in/thien-trandinh/"
                          iconClass="ion-social-linkedin"
                          label="LinkedIn"
                        />
                      </h5>
                    </div>
                    <div className="more-info">
                      <p className="lead" style={{ color: "var(--text-primary)" }}>
                        Interested in my expertise? Have a question? Or just wanted to chat? Send me a message here on or LinkedIn!
                      </p>
                      {/* <!-- <ul class="list-ico">
                              <li><span class="ion-ios-location"></span> 329 WASHINGTON ST BOSTON, MA 02108</li>
                              <li><span class="ion-ios-telephone"></span> (617) 557-0089</li>
                              <li><span class="ion-email"></span> contact@example.com</li>
                              </ul> --> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SurfaceCard>
        </div>
    </SectionShell>
  );
};

export default Contact;
