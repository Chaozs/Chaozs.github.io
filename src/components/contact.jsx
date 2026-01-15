import React from "react";

class Contact extends React.Component {
  render() {
    return (
      <section id="work" className="portfolio-mf sect-pt4 route" style={{ backgroundColor: "rgba(32, 33, 36, 0.6)" }}>

        <div className="container" style={{ backgroundColor: "#2a2a2a", borderRadius: "1%", padding: "35px" }}>
          <div className="row">
            <div className="col-sm-12" style={{ backgroundColor: "#1E1E1E", padding: "15px", borderRadius: "2%" }}>
              <div className="contact-mf">
                <div id="contact">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="title-box-2">
                        <h5 className="title-left" style={{ color: "#E4E4E4" }}>Send A Message</h5>
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
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  id="name"
                                  placeholder="Your Name"
                                  data-rule="minlen:4"
                                  data-msg="Please enter at least 4 chars"
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  id="email"
                                  placeholder="Your Email"
                                  data-rule="email"
                                  data-msg="Please enter a valid email"
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="subject"
                                  id="subject"
                                  placeholder="Subject"
                                  data-rule="minlen:4"
                                  data-msg="Please enter at least 8 chars of subject"
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <textarea
                                  className="form-control"
                                  name="message"
                                  rows="5"
                                  data-rule="required"
                                  data-msg="Please write something for us"
                                  placeholder="Message"
                                ></textarea>
                                <div className="validation"></div>
                              </div>
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
                        <h5 className="title-left" style={{ color: "#E4E4E4" }}>
                          <div className="socials">
                            <ul>
                              <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <a
                                  href="https://www.linkedin.com/in/thien-trandinh/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                    <span className="ico-circle"   style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}>
                                    <i className="ion-social-linkedin"></i>
                                  </span>
                                </a>
                              </span>
                            </ul>
                          </div>
                        </h5>
                      </div>
                      <div className="more-info">
                        <p className="lead" style={{ color: "#E4E4E4" }}>
                          Interested in my expertise? Have a question? Or just wanted to chat? Send me a message here on or linkedin!
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
            </div>
          </div>
        </div>
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
      </section>
    );
  }
}

export default Contact;
