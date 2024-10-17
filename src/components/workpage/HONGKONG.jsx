import { Container } from "react-bootstrap";
import WSPGallery from "./utility/WSPGallery";
import { Link } from "react-router-dom";

import art1 from "../../assets/img/works/workpage/HONGKONG/SOCIALMEDIA/1.png";
import art2 from "../../assets/img/works/workpage/HONGKONG/SOCIALMEDIA/2.png";
import art3 from "../../assets/img/works/workpage/HONGKONG/SOCIALMEDIA/3.png";
import art4 from "../../assets/img/works/workpage/HONGKONG/SOCIALMEDIA/4.1.mp4";
import art6 from "../../assets/img/works/workpage/HONGKONG/SOCIALMEDIA/6.1.mp4";
import art7 from "../../assets/img/works/workpage/HONGKONG/SOCIALMEDIA/7.png";
import art8 from "../../assets/img/works/workpage/HONGKONG/SOCIALMEDIA/8.png";
import art9 from "../../assets/img/works/workpage/HONGKONG/SOCIALMEDIA/9.png";
import art10 from "../../assets/img/works/workpage/HONGKONG/SOCIALMEDIA/10.png";

import tiktok1 from "../../assets/img/works/workpage/HONGKONG/TIKTOK/Hukha.1.mp4";
import tiktok2 from "../../assets/img/works/workpage/HONGKONG/TIKTOK/Minn Cookie x Hong Kong MX Mooncakes.1.mp4";

import GDN1 from "../../assets/img/works/workpage/HONGKONG/GDN/GDN1.png";
import GDN2 from "../../assets/img/works/workpage/HONGKONG/GDN/GDN2.png";

import pdfUrl from "../../assets/pdf/Hong Kong MX Moon Cake x The Lamp.pdf";
import prPdf from "../../assets/img/works/workpage/HONGKONG/PR/THANH NIÊN - HONG KONG MX MOONCAKES - DETAIL PR DIRECTION 2024.pdf";

export const HONGKONG = () => {
  const galleryImages = [
    { img: art1 },
    { img: art2 },
    { img: art3 },
    { img: art4 },
    { img: art6 },
    { img: art7 },
    { img: art8 },
    { img: art9 },
    { img: art10 },
  ];

  const galleryImages2 = [{ img: GDN1 }, { img: GDN2 }];

  return (
    <section className="workPage">
      <Container>
        <Link to="/NguyenDoThienAn" className="btnHome">
          Return to Homepage
        </Link>
        <h2>HONGKONG MOONCAKE x THE LAMP</h2>
        <h3>
          SOW: Digital campaign - Social Media, Google ads, GDN ads, PR Article,
          Tiktokers Booking, Community Seeding
        </h3>
        <p className="scopeOfWork">
          + Create campaign proposal and pitching with MX Hong Kong client
          <br />
          + Brief direction for media team, quality control with keyword
          planning for google
          <br />
          + Filter and approach suitable KOL with brand identity and process the
          campaign with them
          <br />
          + Order and brief GDN design direction and run ads <br />
          + Work and deal with PR outlets to run 4 articles tp promote MX Hong
          Kong mooncakes <br />
          + Order, brief internal team and quality control for social media
          posts <br />
        </p>
        <h3>Social Posts</h3>
        <WSPGallery galleryImages={galleryImages} />
        <div className="d-flex gap-5 justify-content-around">
          <div>
            <h3>Tiktokers' reviews</h3>
            <div className="d-flex media-container-wrapper">
              <div className="media-container">
                <video src={tiktok1} className="media-video" autoPlay muted />
                <a
                  href="https://vt.tiktok.com/ZS2r4Yov5/"
                  className="media-link"
                >
                  Click here to view post
                </a>
              </div>
              <div className="media-container">
                <video src={tiktok2} className="media-video" autoPlay muted />
                <a
                  href="https://vt.tiktok.com/ZS2BJB4Nv/"
                  className="media-link"
                >
                  Click here to view post
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3>GDN</h3>
            <WSPGallery galleryImages={galleryImages2} />
          </div>
        </div>
        <h3>PR ARTICLE</h3>
        <div className="d-flex flex-column align-items-center pb-5">
          <iframe
            src={prPdf}
            style={{
              width: "60vw",
              height: "600px",
              border: "none",
              borderRadius: "8px", // Rounded corners for the iframe
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            }} 
            title="PDF Preview"
          ></iframe>
          <div className="d-flex justify-content-around gap-5">
            <a href="https://thanhnien.vn/tron-vi-vien-man-voi-banh-trung-thu-hong-kong-mx-185240826170640751.htm" className="media-link">
              Featured on Bao Thanh Nien
            </a>
            <a href="https://giadinh.suckhoedoisong.vn/tron-vi-vien-man-voi-banh-trung-thu-hong-kong-mx-172240828172126645.htm" className="media-link">
              Featured on Bao Moi
            </a>
          </div>
        </div>
        <h3>Proposals</h3>
        <iframe
          src={pdfUrl}
          style={{
            width: "100%",
            minHeight: "800px",
            border: "none",
            borderRadius: "8px", // Rounded corners for the iframe
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          }}
          title="PDF Preview"
        ></iframe>
      </Container>
    </section>
  );
};
