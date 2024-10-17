import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import "animate.css";
import TrackVisibility from "react-on-screen";
import heroImg from "../assets/img/ruou1.jpg";

export const Hero = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["an Account Executive", "a Marketing Specialist", "a Enthusiast"];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <section className="hero" id="home">
      <Container className="">
        <Row className="d-flex align-items-center">
          <Col xs={12} md={6} xl={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className="textContainer">
                  <div
                    className={
                      isVisible ? "animate__animated animate__fadeIn" : ""
                    }
                  >
                    <p className="textRotate">
                      {`I'm An, `}{" "}
                      <span
                        className="txt-rotate"
                        dataPeriod="1000"
                        data-rotate='[ "an Account Executive", "a Marketing Specialist", "a Enthusiast" ]'
                      >
                        <span className="wrap">{text}</span>
                      </span>
                    </p>
                    <h1>Nguyen Do Thien An</h1>
                    <p className="Para">
                      I understand that starting a career can be challenging,
                      but I am not ​intimidated by difficulties. Instead, I see
                      them as opportunities to learn ​and grow.
                    </p>

                    <a
                      href="#work"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <button className="workBtn btn btn-light">My Work</button>
                    </a>
                    <a
                      href="#footer"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <button className=" contactBtn btn btn-outline-light">
                        Contact
                      </button>
                    </a>
                  </div>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={0} md={6} xl={6}>
            <div className="heroImgContainer" style={{filter: "grayscale(100%) saturate(50%)"}}>
              <img src={heroImg} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
