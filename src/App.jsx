import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Cookies from "js-cookie"; // Import js-cookie

import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Client } from "./components/Client";
import { Work } from "./components/Work";
import { Pitching } from "./components/Pitching"; // Import the refactored Pitching component
import { Competition } from "./components/Competition";
import { AddWorkCard } from "./components/AddWorkCard";
import EditWorkCard from "./components/EditWorkCard";
import { Footer } from "./components/Footer";
import NotFound from "./components/NotFound";
import SignInButton from "./components/SignInButton"; // Import the sign-in component
import { auth, signOut } from "../firebaseConfig"; // Firebase configuration

import { HONGKONG } from "./components/workpage/HONGKONG";
import { HP } from "./components/workpage/HP";
import { OTEKER } from "./components/workpage/OTEKER";

import { getBlogData } from "./lib/blog"; // Import the blog fetching function
import BlogPage from "./components/BlogPage";

function App() {
  const [workCards, setWorkCards] = useState([]);
  const [pitchCards, setPitchCards] = useState([]); // New state for pitch cards
  const [comCards, setComCards] = useState([]);
  const [signedInUser, setSignedInUser] = useState(null); // Track signed-in user

  // List of allowed emails
  const allowedEmails = [
    "duyhung08112003@gmail.com",
    "annguyen20112003@gmail.com",
  ];

  // Restore session from cookies on app load
  useEffect(() => {
    const storedUser = Cookies.get("signedInUser");
    if (storedUser) {
      setSignedInUser(JSON.parse(storedUser)); // Restore user from cookie
    }
  }, []);

  // Fetch workcards data from the backend (for main workcards)
  useEffect(() => {
    fetch("https://thienanbackend-production.up.railway.app/api/workcards")
      .then((response) => response.json())
      .then((data) => {
        setWorkCards(data);
      })
      .catch((error) => console.error("Error fetching workcards:", error));
  }, []);

  // Fetch pitchcards data from the backend (for pitching section)
  useEffect(() => {
    fetch("https://thienanbackend-production.up.railway.app/api/pitches") // New API endpoint for pitches
      .then((response) => response.json())
      .then((data) => {
        setPitchCards(data);
      })
      .catch((error) => console.error("Error fetching pitches:", error));
  }, []);

  useEffect(() => {
    fetch("https://thienanbackend-production.up.railway.app/api/competition") // New API endpoint for pitches
      .then((response) => response.json())
      .then((data) => {
        setComCards(data);
      })
      .catch((error) => console.error("Error fetching pitches:", error));
  }, []);

  const addNewWorkCard = (formData, targetTable) => {
    console.log("FormData being sent:", [...formData.entries()]); // Log formData

    fetch(
      `https://thienanbackend-production.up.railway.app/api/${targetTable}`,
      {
        method: "POST",
        body: formData, // Use FormData instead of JSON
      }
    )
      .then((response) => {
        console.log("Server response:", response);

        // Check if the content type is JSON before parsing
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          throw new Error("Server did not return JSON.");
        }
      })
      .then((addedCard) => {
        // Add the card to the corresponding state based on the target table
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

        // Show an error alert
        alert("An error occurred while adding the card. Please try again.");
      });
  };

  const [blogs, setBlogs] = useState([]);

  // Fetch blog data when the component mounts
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
          path="/NguyenDoThienAn/"
          element={
            <div className="App">
              <NavBar />
              <Hero />
              <About />
              <Client />
              <Container>
                <Row>
                  <Col xs={12} md={6} xl={6}>
                    {" "}
                    <Pitching
                      pitchCards={pitchCards}
                      signedInUser={signedInUser}
                    />
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                    {" "}
                    <Competition
                      comCards={comCards}
                      signedInUser={signedInUser}
                    />
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
          path="/NguyenDoThienAn/HONGKONGMooncake"
          element={
            <div className="App">
              <HONGKONG />
              <Footer />
            </div>
          }
        />

        <Route
          path="/NguyenDoThienAn/HanhPhucInternational"
          element={
            <div className="App">
              <HP />
              <Footer />
            </div>
          }
        />

        <Route
          path="/NguyenDoThienAn/DrOTEKER"
          element={
            <div className="App">
              <OTEKER />
              <Footer />
            </div>
          }
        />

        {/* Route to render individual blog details */}
        <Route
          path="/NguyenDoThienAn/blog/:slug"
          element={
            <div className="App">
              <BlogPage />
              <Footer />
            </div>
          }
        />

        {/* Add Work Route - Only allow access if signed in and email is in allowedEmails */}
        {signedInUser && allowedEmails.includes(signedInUser.email) && (
          <Route
            path="/NguyenDoThienAn/add-work"
            element={
              <div className="App">
                <AddWorkCard
                  addNewWorkCard={(formData) =>
                    addNewWorkCard(formData, "workcards")
                  }
                  targetTable="workcards"
                />
                <Footer />
              </div>
            }
          />
        )}
        {signedInUser && allowedEmails.includes(signedInUser.email) && (
          <Route
            path="/NguyenDoThienAn/add-pitches"
            element={
              <div className="App">
                <AddWorkCard
                  addNewWorkCard={(formData) =>
                    addNewWorkCard(formData, "pitches")
                  }
                  targetTable="pitches"
                />
                <Footer />
              </div>
            }
          />
        )}
        {signedInUser && allowedEmails.includes(signedInUser.email) && (
          <Route
            path="/NguyenDoThienAn/add-competition"
            element={
              <div className="App">
                <AddWorkCard
                  addNewWorkCard={(formData) =>
                    addNewWorkCard(formData, "competition")
                  }
                  targetTable="competition"
                />
                <Footer />
              </div>
            }
          />
        )}
        {signedInUser && allowedEmails.includes(signedInUser.email) && (
          <Route
            path="/NguyenDoThienAn/edit-work/:table/:id" // Include :table as a route parameter
            element={
              <div className="App">
                <EditWorkCard />
                <Footer />
              </div>
            }
          />
        )}
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
