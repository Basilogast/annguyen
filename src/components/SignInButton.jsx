import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { auth, provider, signInWithPopup, signOut } from "../../firebaseConfig"; // Ensure correct path
import Cookies from "js-cookie"; // Import js-cookie

const SignInButton = ({ signedInUser, setSignedInUser }) => {
  const [errorMessage, setErrorMessage] = useState("");

  // List of allowed emails
  const allowedEmails = [
    "duyhung08112003@gmail.com",
    "annguyen20112003@gmail.com",
  ];

  // Check if user is stored in cookies on component mount
  useEffect(() => {
    const storedUser = Cookies.get("signedInUser");
    if (storedUser) {
      setSignedInUser(JSON.parse(storedUser)); // Parse user from cookie
    }
  }, [setSignedInUser]);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (allowedEmails.includes(user.email)) {
        setSignedInUser(user); // Set signed-in user to your app state
        Cookies.set("signedInUser", JSON.stringify(user), { expires: 7 }); // Store user in cookie with 7-day expiration
        setErrorMessage(""); // Clear any previous errors
      } else {
        // If email is not allowed, sign out and show an error
        await signOut(auth);
        setErrorMessage("Access Denied: Only specific users can sign in.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("Failed to sign in. Please try again.");
    }
  };

  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      const response = await fetch("https://thienanbackend-production.up.railway.app/logout", {
        method: "POST",
        credentials: "include", // Include credentials (session cookies)
      });

      if (response.ok) {
        // Handle successful logout, clear session
        setSignedInUser(null);
        Cookies.remove("signedInUser"); // Clear the stored user cookie
      } else {
        console.error("Sign-out failed");
      }
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const signOutButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545", // Red color for sign out
  };

  const welcomeTextStyle = {
    fontSize: "24px", // Make the text larger
    fontWeight: "bold", // Add bold styling
    color: "white", // Add a nice blue color
    margin: "20px 0", // Add spacing around the text
    fontFamily: "Arial, sans-serif", // Use a clean, readable font
  };

  return (
    <Container>
      <div>
        {signedInUser ? (
          <>
            <p style={welcomeTextStyle}>Welcome, {signedInUser.displayName}</p>
            <button
              className="sign-out-btn"
              onClick={handleSignOut}
              style={signOutButtonStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#c82333")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#dc3545")
              }
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={handleSignIn}
            style={buttonStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            Sign In with Google
          </button>
        )}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </Container>
  );
};

export default SignInButton;
