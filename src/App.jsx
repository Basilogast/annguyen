import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Cookies from "js-cookie";

import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Client } from "./components/Client";
import { Work } from "./components/Work";
import { Pitching } from "./components/Pitching";
import { Competition } from "./components/Competition";
import { AddWorkCard } from "./components/AddWorkCard";
import EditWorkCard from "./components/EditWorkCard";
import { Footer } from "./components/Footer";
import NotFound from "./components/NotFound";
import SignInButton from "./components/SignInButton";
import { HONGKONG } from "./components/workpage/HONGKONG";
import { HP } from "./components/workpage/HP";
import { OTEKER } from "./components/workpage/OTEKER";
import { getBlogData } from "./lib/blog";
import BlogPage from "./components/BlogPage";

function App() {
  const [workCards, setWorkCards] = useState([]);
  const [pitchCards, setPitchCards] = useState([]);
  const [comCards, setComCards] = useState([]);
  const [signedInUser, setSignedInUser] = useState(null);

  const allowedEmails = [
    "duyhung08112003@gmail.com",
    "annguyen20112003@gmail.com",
  ];

  useEffect(() => {
    const storedUser = Cookies.get("signedInUser");
    if (storedUser) {
      setSignedInUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetch("https://thienanbackend-production.up.railway.app/api/workcards")
      .then((response) => response.json())
      .then((data) => {
        setWorkCards(data);
      })
      .catch((error) => console.error("Error fetching workcards:", error));
  }, []);

  useEffect(() => {
    fetch("https://thienanbackend-production.up.railway.app/api/pitches")
      .then((response) => response.json())
      .then((data) => {
        setPitchCards(data);
      })
      .catch((error) => console.error("Error fetching pitches:", error));
  }, []);

  useEffect(() => {
    fetch("https://thienanbackend-production.up.railway.app/api/competition")
      .then((response) => response.json())
      .then((data) => {
        setComCards(data);
      })
      .catch((error) => console.error("Error fetching competition:", error));
  }, []);

  const addNewWorkCard = (formData, targetTable) => {
    fetch(
      `https://thienanbackend-production.up.railway.app/api/${targetTable}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          throw new Error("Server did not return JSON.");
        }
      })
      .then((addedCard) => {
        if (targetTable === "workcards") {
          setWorkCards([...workCards, addedCard]);
        } else if (targetTable === "pitches") {
          setPitchCards([...pitchCards, addedCard]);
        } else if (targetTable === "competition") {
          setComCards([...comCards, addedCard]);
        }
      })
      .catch((error) => {
        console.error("Error adding card:", error);
        alert("An error occurred while adding the card. Please try again.");
      });
  };

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getBlogData();
      setBlogs(data);
    }
    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <NavBar />
              <Hero />
              <About />
              <Client />
              <Container>
                <Row>
                  <Col xs={12} md={6} xl={6}>
                    <Pitching pitchCards={pitchCards} signedInUser={signedInUser} />
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                    <Competition comCards={comCards} signedInUser={signedInUser} />
                  </Col>
                </Row>
              </Container>
              <Work workCards={workCards} signedInUser={signedInUser} />
              <Footer />
              <SignInButton
                signedInUser={signedInUser}
                setSignedInUser={setSignedInUser}
              />
            </div>
          }
        />

        <Route
          path="/HONGKONGMooncake"
          element={
            <div className="App">
              <HONGKONG />
              <Footer />
            </div>
          }
        />

        <Route
          path="/HanhPhucInternational"
          element={
            <div className="App">
              <HP />
              <Footer />
            </div>
          }
        />

        <Route
          path="/DrOTEKER"
          element={
            <div className="App">
              <OTEKER />
              <Footer />
            </div>
          }
        />

        <Route
          path="/blog/:slug"
          element={
            <div className="App">
              <BlogPage />
              <Footer />
            </div>
          }
        />

        {signedInUser && allowedEmails.includes(signedInUser.email) && (
          <Route
            path="/add-work"
            element={
              <div className="App">
                <AddWorkCard addNewWorkCard={(formData) => addNewWorkCard(formData, "workcards")} />
                <Footer />
              </div>
            }
          />
        )}
        {signedInUser && allowedEmails.includes(signedInUser.email) && (
          <Route
            path="/add-pitches"
            element={
              <div className="App">
                <AddWorkCard addNewWorkCard={(formData) => addNewWorkCard(formData, "pitches")} />
                <Footer />
              </div>
            }
          />
        )}
        {signedInUser && allowedEmails.includes(signedInUser.email) && (
          <Route
            path="/add-competition"
            element={
              <div className="App">
                <AddWorkCard addNewWorkCard={(formData) => addNewWorkCard(formData, "competition")} />
                <Footer />
              </div>
            }
          />
        )}
        {signedInUser && allowedEmails.includes(signedInUser.email) && (
          <Route
            path="/edit-work/:table/:id"
            element={
              <div className="App">
                <EditWorkCard />
                <Footer />
              </div>
            }
          />
        )}

        <Route
          path="*"
          element={
            <div className="App">
              <NotFound />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
