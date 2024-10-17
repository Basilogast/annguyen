import React from "react";

function NotFound() {
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1a1a1a", // Dark background
      color: "#f5f5f5", // Light font color
      fontFamily: "'Lato', sans-serif",
      padding: "20px",
    },
    content: {
      textAlign: "center",
      padding: "30px",
      backgroundColor: "#2b2b2b",
      borderRadius: "12px",
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.5)",
    },
    title: {
      fontSize: "6rem",
      marginBottom: "20px",
      color: "#f05454", // Highlighted color for the title
    },
    subtitle: {
      fontSize: "2.5rem",
      marginBottom: "20px",
      color: "#f5f5f5",
    },
    text: {
      fontSize: "1.5rem",
      marginBottom: "30px",
      color: "#cccccc",
    },
    button: {
      padding: "12px 25px",
      fontSize: "1.2rem",
      backgroundColor: "#f05454", // Button color
      color: "#f5f5f5",
      textDecoration: "none",
      borderRadius: "6px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#d94242", // Button hover color
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <h2 style={styles.subtitle}>Page Not Found</h2>
        <p style={styles.text}>Oops! The page you’re looking for doesn’t exist.</p>
        <a
          href="/NguyenDoThienAn/"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
