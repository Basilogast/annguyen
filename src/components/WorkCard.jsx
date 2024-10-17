import React, { useState, useEffect } from 'react';
import PdfModal from './PdfModal'; // Import the PdfModal component

function WorkCard({ id, img, text, size, pdfUrl, textPara, detailsRoute, signedInUser, targetTable }) {
  const [hover, setHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if the modal is open
  const [mediaUrl, setMediaUrl] = useState(''); // Initialize media URL
  const [pdfUrlState, setPdfUrlState] = useState(''); // Rename state variable to avoid conflict with prop pdfUrl

  useEffect(() => {
    // Clean up object URLs when the component unmounts or props change
    if (mediaUrl) URL.revokeObjectURL(mediaUrl);
    if (pdfUrlState) URL.revokeObjectURL(pdfUrlState);

    // Create object URLs only if the props are File objects
    if (img instanceof File) {
      setMediaUrl(URL.createObjectURL(img));
    } else {
      setMediaUrl(img || ''); // Use the URL directly if it's not a File object
    }

    if (pdfUrl instanceof File) {
      setPdfUrlState(URL.createObjectURL(pdfUrl));
    } else {
      setPdfUrlState(pdfUrl || ''); // Use the URL directly if it's not a File object
    }

    return () => {
      // Clean up object URLs when the component unmounts
      if (mediaUrl) URL.revokeObjectURL(mediaUrl);
      if (pdfUrlState) URL.revokeObjectURL(pdfUrlState);
    };
  }, [img, pdfUrl]);

  const handleCardClick = () => {
    setIsModalOpen(true); // Open the modal when the card is clicked
  };

  const isVideo = (url) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return url && videoExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  const cardStyles = {
    margin: '15px 10px',
    padding: 0,
    borderRadius: '16px',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: hover
      ? '0 8px 15px rgba(0, 0, 0, 0.3)' // Enhanced shadow on hover
      : '0 4px 6px rgba(0, 0, 0, 0.1)', // Default shadow
    transform: hover ? 'scale(1.05)' : 'scale(1)', // Enlarge effect on hover
    gridRowEnd: size === 'small' ? 'span 26' : size === 'medium' ? 'span 33' : 'span 45',
  };

  const mediaStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    filter: hover ? 'brightness(60%)' : 'brightness(100%)', // Darken on hover
    transition: 'all 0.3s ease-in-out',
  };

  const textStyles = {
    position: 'absolute',
    zIndex: 2,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '20px',
    opacity: hover ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    textAlign: 'center',
    width: '100%',
  };

  return (
    <>
      <div
        style={cardStyles}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleCardClick} // Trigger modal opening on click
      >
        {/* Display video if the source is video, otherwise display image */}
        {isVideo(mediaUrl) ? (
          <video style={mediaStyles} src={mediaUrl} autoPlay loop muted />
        ) : (
          <div
            style={{
              ...mediaStyles,
              backgroundImage: `url(${mediaUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        <div style={textStyles}>
          {text || 'Hover Text'}
        </div>
      </div>

      {/* Modal to display the PDF */}
      <PdfModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        pdfUrl={pdfUrlState} // Pass the updated PDF URL state
        text={textPara}
        detailsRoute={detailsRoute} // Pass the details route as a prop
        id={id}
        signedInUser={signedInUser} // Pass signedInUser prop to PdfModal
        targetTable={targetTable} // Pass the target table as a prop
      />
    </>
  );
}

export default WorkCard;
