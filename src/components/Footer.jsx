import React, { useState } from "react";
import star from "../assets/img/starinhand.png";
import hero from "../assets/img/ruou1.jpg";
import location from "../assets/img/location.svg";
import mail from "../assets/img/mail.svg";
import phone from "../assets/img/phone.svg";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

export const Footer = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    try {
      let response = await fetch("https://thienanbackend-production.up.railway.app/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formDetails),
      });
      setButtonText("Send");
      let result = await response.json();
      setFormDetails(formInitialDetails);
      if (result.success) {
        setStatus({ success: true, message: 'Message sent successfully!' });
      } else {
        setStatus({ success: false, message: 'Failed to send message. Please try again later.' });
      }
    } catch (error) {
      setButtonText("Send");
      setStatus({ success: false, message: 'An error occurred. Please try again later.' });
    }
  };

  return (
    <section className="footer" id="footer">
      <Container>
        <Row className="d-flex">
          <Col xs={12} md={4} xl={4}>
            {/* <img src={star} alt="star" /> */}
            <h2>
              Work <br />
              with me
            </h2>
          </Col>
          <Col xs={12} md={3} xl={3}>
            <div className="imgWrapper" style={{filter: "grayscale(100%) saturate(50%)"}}>
              <img src={hero} className="profile" alt="profile" />
            </div>
          </Col>
          <Col xs={12} md={5} xl={5} style={{ paddingLeft: "30px" }}>
            <hr />
            <div className="d-flex flex-column" style={{ width: "100%", height: "100%" }}>
              <div className="d-flex" style={{ margin: "10px 0" }}>
                <div className="iconWrapper">
                  <img src={location} alt="location" />
                </div>
                <div>
                  <h3>Address</h3>
                  <p>8 District, Ho Chi Minh City, Viet Nam</p>
                </div>
              </div>
              <div className="d-flex" style={{ margin: "10px 0" }}>
                <div className="iconWrapper">
                  <img src={mail} alt="mail" />
                </div>
                <div>
                  <h3>Email</h3>
                  <p className="email-wrapper">annguyen20112003@gmail.com</p>
                </div>
              </div>
              <div className="d-flex" style={{ margin: "10px 0" }}>
                <div className="iconWrapper">
                  <img src={phone} alt="phone" />
                </div>
                <div>
                  <h3>Phone</h3>
                  <p>0902784042</p>
                </div>
              </div>

              {/* Contact Form */}
              <Form onSubmit={handleSubmit} style={{ fontSize: "18px" }}>
                <Row>
                  <Col sm={6}>
                    <Form.Group controlId="formFirstName">
                      <Form.Label style={{ fontSize: "20px" }}>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formDetails.firstName}
                        placeholder="Enter your first name"
                        onChange={(e) => onFormUpdate('firstName', e.target.value)}
                        required
                        style={{ fontSize: "18px", padding: "10px" }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="formLastName">
                      <Form.Label style={{ fontSize: "20px" }}>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formDetails.lastName}
                        placeholder="Enter your last name"
                        onChange={(e) => onFormUpdate('lastName', e.target.value)}
                        required
                        style={{ fontSize: "18px", padding: "10px" }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="formEmail">
                      <Form.Label style={{ fontSize: "20px" }}>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={formDetails.email}
                        placeholder="Enter your email"
                        onChange={(e) => onFormUpdate('email', e.target.value)}
                        required
                        style={{ fontSize: "18px", padding: "10px" }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="formPhone">
                      <Form.Label style={{ fontSize: "20px" }}>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        value={formDetails.phone}
                        placeholder="Enter your phone number"
                        onChange={(e) => onFormUpdate('phone', e.target.value)}
                        style={{ fontSize: "18px", padding: "10px" }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group controlId="formMessage">
                      <Form.Label style={{ fontSize: "20px" }}>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        value={formDetails.message}
                        placeholder="Type your message..."
                        onChange={(e) => onFormUpdate('message', e.target.value)}
                        required
                        style={{ fontSize: "18px", padding: "10px" }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit" style={{ fontSize: "20px", marginTop: "15px", padding: "10px 20px" }}>
                  {buttonText}
                </Button>
              </Form>

              {/* Status Message */}
              {status.message && (
                <Alert variant={status.success ? "success" : "danger"} style={{ marginTop: "20px" }}>
                  {status.message}
                </Alert>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
