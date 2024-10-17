import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./wsp-gallery.css";

const WSPGallery = ({ galleryImages }) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (index) => {
    setSlideNumber(index);
    setOpenModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Previous Image
  const prevSlide = () => {
    setSlideNumber((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  // Next Image
  const nextSlide = () => {
    setSlideNumber((prev) =>
      prev + 1 === galleryImages.length ? 0 : prev + 1
    );
  };

  // Determine if media is video by checking its file extension
  const isVideo = (src) => {
    const videoExtensions = ["mp4", "webm", "ogg"];
    const ext = src.split(".").pop().toLowerCase();
    return videoExtensions.includes(ext);
  };

  return (
    <div>
      {openModal && (
        <div className="sliderWrap">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="btnClose"
            onClick={handleCloseModal}
          />
          <FontAwesomeIcon
            icon={faCircleChevronLeft}
            className="btnPrev"
            onClick={prevSlide}
          />
          <FontAwesomeIcon
            icon={faCircleChevronRight}
            className="btnNext"
            onClick={nextSlide}
          />
          <div className="fullScreenImage">
            {isVideo(galleryImages[slideNumber].img) ? (
              <video
                src={galleryImages[slideNumber].img}
                controls
                autoPlay
                muted // Add muted here
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : (
              <img
                src={galleryImages[slideNumber].img}
                alt=""
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            )}
          </div>
        </div>
      )}

      <div className="galleryWrap">
        {galleryImages &&
          galleryImages.map((slide, index) => (
            <div
              className="single"
              key={index}
              onClick={() => handleOpenModal(index)}
            >
              {isVideo(slide.img) ? (
                <video
                  src={slide.img}
                  style={{ maxWidth: "100%" }}
                  autoPlay
                  loop
                  muted
                />
              ) : (
                <img src={slide.img} alt="" style={{ maxWidth: "100%" }} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default WSPGallery;
