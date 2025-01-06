import React from "react";
import logo1 from "../img/ProfilePic.jpg";

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      logo: logo1,
      skills: [
        { id: "HTML5_skill", content: "HTML5", porcentage: "80%", value: "80" },
        { id: "CSS3_skill", content: "CSS3", porcentage: "75%", value: "75" },
        {
          id: "JavaScript_skill",
          content: "JavaScript",
          porcentage: "90%",
          value: "90"
        },
        { id: "PHP_skill", content: "PHP", porcentage: "70%", value: "70" },
        {
          id: "ReactJS_skill",
          content: "ReactJS",
          porcentage: "80%",
          value: "80"
        },
        {
          id: "Python_skill",
          content: "Python",
          porcentage: "75%",
          value: "75"
        },
        {
          id: "VanillaJS_skill",
          content: "VanillaJS",
          porcentage: "85%",
          value: "85"
        },
        {
          id: "Wordpress_skill",
          content: "Wordpress",
          porcentage: "80%",
          value: "80"
        }
      ],
      about_me: [
        {
          id: "first-p-about",
          content:
            "I'm a full-stack developer passionate about creating robust, modular, and scalable software that I hope will outlive me. I’ve been fortunate to gain experience across a wide range of development environments—from a fast-paced startup to a structured, large-scale corporate setting, and even a research-oriented role at a hospital. "
        },
        {
          id: "second-p-about",
          content:
            'Most recently, I served as the lead full-stack developer at Gatarn Games Ltd., where I worked on <a href="https://www.crazygames.com/game/skillfite-io" target="_blank" rel="noopener noreferrer">Skillfite.io</a>, a popular web game with over 1,000 daily players and more than 1 million accounts created.'
        },
        {
          id: "third-p-about",
          content:
            'Outside of my professional experience, I completed my thesis, <a href="https://macsphere.mcmaster.ca/handle/11375/29773" target="_blank" rel="noopener noreferrer">Generating Player-Traversable Paths for Cyclescape From Real World Data</a> as part of my MASc in Software Engineering.'
        },
        {
          id: "third-p-about",
          content:
            'In my free time, I enjoy playing piano (I used to perform part-time before starting my tech career), experimenting with new recipes, and playing video games.'
        }
      ]
    };
  }

  render() {
    return (
      <section id="about" className="about-mf sect-pt4 route" style={{ backgroundColor: "#202124" }}>
        <div className="container" style={{backgroundColor: "#181818", borderRadius: "1%", padding: "20px"}}>
          <div className="title-box text-center" style={{padding: "20px"}}>
            <h3 className="title-a" style={{color: "#E4E4E4"}}> About</h3>
            <div className="line-mf"></div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div>
                  <div className="row">
                  <div className="col-md-6">
                  <div className="about-me pt-4 pt-md-0">
                    <a className="navbar-brand js-scroll" href="#page-top">
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <img
                          src={this.state.logo}
                          alt="logo"
                          style={{ maxWidth: "100%", marginBottom: "20px", borderRadius: "2%", marginLeft: "-15px" }}
                        />
                      </div>
                    </a>
                    <div className="skill-mf" style={{ backgroundColor: "#1E1E1E", padding: "15px", borderRadius: "2%", marginLeft: "-5px"}}>
                          <p className="title-s" style={{color: "#9A9A9A"}}>Languages:</p>
                          <p className="lead" style={{color: "#E4E4E4"}}>C#, Typescript, Javascript, Java, SQL </p>
                          <p className="title-s" style={{color: "#9A9A9A"}}>Framework:</p>
                          <p className="lead" style={{color: "#E4E4E4"}}> .NET, Unity, VUE, Playcanvas</p>
                          <p className="title-s" style={{color: "#9A9A9A"}}>Other:</p>
                          <p className="lead" style={{color: "#E4E4E4"}}> Git, REST, Linux, Jira, Jenkins, Agile, Scrum</p>
                        {/* {this.state.skills.map(skill => {
                          return (
                            <React.Fragment key={skill.id}>
                              <span>{skill.content}</span>{" "}
                              <span className="pull-right">
                                {skill.porcentage}
                              </span>
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: skill.porcentage }}
                                  aria-valuenow={skill.value}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </React.Fragment>
                          );
                        })} */}
                      </div>
                  </div>
                </div>
                    <div className="col-md-6" style={{ backgroundColor: "#1E1E1E", padding: "15px", borderRadius: "2%", marginRight: "-50px"}}>
                      <div className="row">
                        <div
                          className="col-sm-6 col-md-5"
                          style={{ margin: "0 auto" }}
                        >
                          <div
                            className="about-img"
                            style={{ textAlign: "center" }}
                          >
                            <img
                              className="img-fluid rounded b-shadow-a"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      {this.state.about_me.map((content) => {
                      return (
                        <p
                          className="lead"
                          key={content.id}
                          style={{color: "#E4E4E4"}}
                          dangerouslySetInnerHTML={{ __html: content.content }}
                        ></p>
                      );
                    })}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
