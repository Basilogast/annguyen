import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebaseConfig"; // Your Firebase config

function EditWorkCard() {
  const { id, table } = useParams(); // Get both the workcard ID and table from the URL
  const navigate = useNavigate();

  const [workData, setWorkData] = useState({
    text: "",
    textPara: "",
    detailsRoute: "",
    size: "small", // Default size
  });
  const [mediaFile, setMediaFile] = useState(null); // State to handle media (img/video) file
  const [pdfFile, setPdfFile] = useState(null); // State to handle pdf/video/img file
  const [loading, setLoading] = useState(false); // Loading state
  const [mediaFileName, setMediaFileName] = useState(""); // For storing the current media file name
  const [mediaFilePath, setMediaFilePath] = useState(""); // For storing the current Firebase media path
  const [pdfFileName, setPdfFileName] = useState(""); // For storing the current PDF file name

  useEffect(() => {
    const fetchWorkCard = async () => {
      try {
        const response = await fetch(
          `https://thienanbackend-production.up.railway.app/api/${table}/${id}`
        ); // Use table in the API request
        if (response.ok) {
          const data = await response.json();
          setWorkData({
            text: data.text,
            textPara: data.textPara.join("\n"), // Convert array to comma-separated string
            detailsRoute: data.detailsRoute,
            size: data.size,
          });
          setMediaFileName(data.img ? data.img.split("/").pop() : "");
          setMediaFilePath(data.img || ""); // Store the Firebase path for deletion
          setPdfFileName(data.pdfUrl ? data.pdfUrl.split("/").pop() : "");
        } else {
          console.error("Failed to fetch workcard data");
        }
      } catch (error) {
        console.error("Error fetching workcard:", error);
      }
    };

    fetchWorkCard();
  }, [id, table]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkData({
      ...workData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "img") {
      setMediaFile(files[0]); // Set new media file (img/video)
      setMediaFileName(files[0].name); // Display the file name in the input
    } else if (name === "pdfUrl") {
      setPdfFile(files[0]); // Set new PDF or media file
      setPdfFileName(files[0].name); // Display the file name in the input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start loading state
    setLoading(true);

    const workDataToSend = {
      ...workData,
      textPara:  JSON.stringify(workData.textPara.split("\n").filter((item) => item.trim() !== "")) // Convert comma-separated list to array
    };

    let newMediaUrl = mediaFilePath; // Retain the old media path by default
    let newPdfUrl = null;

    try {
      // If a new media (image/video) is uploaded, delete the old one and upload the new one
      if (mediaFile) {
        if (mediaFilePath) {
          const oldMediaRef = ref(storage, mediaFilePath);
          await deleteObject(oldMediaRef);
          console.log("Old media deleted from Firebase:", mediaFilePath);
        }

        // Upload the new media (img/video) to Firebase
        const newMediaRef = ref(
          storage,
          `media/${mediaFile.name}-${Date.now()}`
        );
        const mediaSnapshot = await uploadBytes(newMediaRef, mediaFile);
        newMediaUrl = await getDownloadURL(mediaSnapshot.ref); // Get the download URL of the uploaded media
        console.log("New Media URL:", newMediaUrl);
      }

      // If a new PDF or media (image/video) is uploaded, upload it to Firebase
      if (pdfFile) {
        const newPdfRef = ref(storage, `pdf/${pdfFile.name}-${Date.now()}`);
        const pdfSnapshot = await uploadBytes(newPdfRef, pdfFile);
        newPdfUrl = await getDownloadURL(pdfSnapshot.ref); // Get the download URL of the uploaded PDF/media
        console.log("New PDF/Media URL:", newPdfUrl);
      }

      // Prepare FormData with the updated data
      const formData = new FormData();
      formData.append("text", workDataToSend.text);
      formData.append("textPara", workDataToSend.textPara);
      formData.append("detailsRoute", workDataToSend.detailsRoute);
      formData.append("size", workDataToSend.size);

      if (newMediaUrl) {
        formData.append("img", newMediaUrl); // Append the new media URL (image/video)
      }
      if (newPdfUrl) {
        formData.append("pdfUrl", newPdfUrl); // Append the new PDF or media URL
      }

      const response = await fetch(
        `https://thienanbackend-production.up.railway.app/api/${table}/${id}`, // Use table in the API request
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Workcard updated successfully");
        navigate("/NguyenDoThienAn/"); // Redirect to the main page
        window.location.reload();
      } else {
        alert("Failed to update workcard");
      }
    } catch (error) {
      console.error("Error updating workcard:", error);
    } finally {
      // Stop loading state
      setLoading(false);
    }
  };

  return (
    <Container style={{ paddingTop: "50px" }}>
      <Link to="/NguyenDoThienAn" className="btnHome">
        Return to Homepage
      </Link>
      <Container className="add-workcard-container">
        <h2 className="form-title">Edit Work Card</h2>
        <Form onSubmit={handleSubmit} className="custom-form">
          <Form.Group controlId="formWorkTitle" className="form-group">
            <Form.Label className="form-label">Work Title</Form.Label>
            <Form.Control
              type="text"
              name="text"
              value={workData.text}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="formWorkTextPara" className="form-group">
            <Form.Label className="form-label">
              Description (Enter for new line)
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="textPara"
              value={workData.textPara}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="formDetailsRoute" className="form-group">
            <Form.Label className="form-label">Details Route</Form.Label>
            <Form.Control
              type="text"
              name="detailsRoute"
              value={workData.detailsRoute}
              onChange={handleInputChange}
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="formWorkSize" className="form-group">
            <Form.Label className="form-label">Card Size</Form.Label>
            <Form.Control
              as="select"
              name="size"
              value={workData.size}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formWorkImage" className="form-group">
            <Form.Label className="form-label">Current Image/Video</Form.Label>
            {mediaFileName ? (
              <p>Current Media: {mediaFileName}</p>
            ) : (
              <p>No media uploaded</p>
            )}
            <Form.Control
              type="file"
              name="img"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="formWorkPdf" className="form-group">
            <Form.Label className="form-label">
              Current PDF/Image/Video
            </Form.Label>
            {pdfFileName ? (
              <p>Current PDF/Media: {pdfFileName}</p>
            ) : (
              <p>No PDF/Media uploaded</p>
            )}
            <Form.Control
              type="file"
              name="pdfUrl"
              accept=".pdf,image/*,video/*"
              onChange={handleFileChange}
              className="form-control"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="submit-btn"
            disabled={loading} // Disable the button when loading is true
            style={{
              cursor: loading ? "progress" : "pointer", // Show loading cursor when submitting
              opacity: loading ? 0.7 : 1, // Dim the button when loading
              transition: "opacity 0.3s ease", // Smooth transition effect
            }}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Updating WorkCard...
              </>
            ) : (
              "Update WorkCard"
            )}
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default EditWorkCard;
