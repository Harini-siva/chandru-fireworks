import React from "react";
import "./Hero.css";
import { generalEnquiry } from "../utils/whatsapp.js";

export default function Hero({ onExplore }) {
  return (
    <section className="hero-section" id="home">

      {/* =====================================================
          FULL BACKGROUND VIDEO
      ====================================================== */}
      <video
        className="hero-background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="/videos/crackers-bg.mp4"
          type="video/mp4"
        />

        Your browser does not support the video tag.
      </video>


      {/* =====================================================
          VIDEO DARK OVERLAY
      ====================================================== */}
      <div className="hero-video-overlay"></div>


      {/* =====================================================
          PREMIUM LIGHT / GLOW OVERLAY
      ====================================================== */}
      <div className="hero-light-overlay"></div>


      {/* =====================================================
          MAIN HERO CONTENT
      ====================================================== */}
      <div className="hero-container">

        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}
        <div className="hero-content">

          {/* Eyebrow */}
          <p className="hero-eyebrow">
            <span className="eyebrow-spark">✦</span>
            <span className="eyebrow-spark second">✦</span>
            <span>CHANDRU CRACKERS</span>
          </p>


          {/* Main Heading */}
          <h1 className="hero-title">
            Where Every
            <br />
            Spark Becomes a
            <br />
            <span>Celebration</span>
          </h1>


          {/* Description */}
          <p className="hero-description">
            Discover our collection of crackers and fireworks, carefully
            selected to bring colour, excitement, and unforgettable moments
            to every celebration.
          </p>


          {/* =================================================
              BUTTONS
          ================================================== */}
          <div className="hero-buttons">

            <button
              className="hero-primary-btn"
              onClick={() => onExplore?.()}
            >
              <span>Explore Collection</span>

              <span className="button-arrow">
                →
              </span>
            </button>


            <a
              className="hero-whatsapp-btn"
              href={generalEnquiry()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Enquire on WhatsApp</span>

              <span className="whatsapp-icon">
                ◉
              </span>
            </a>

          </div>

        </div>

      </div>


      {/* =====================================================
          BOTTOM FEATURE / STAT BAR
      ====================================================== */}
      <div className="hero-features">

        {/* Feature 1 */}
        <div className="hero-feature">

          <div className="feature-icon">
            ◇
          </div>

          <div className="feature-text">
            <strong>Quality Crackers</strong>
            <span>Celebrate with confidence</span>
          </div>

        </div>


        {/* Divider */}
        <div className="feature-divider"></div>


        {/* Feature 2 */}
        <div className="hero-feature">

          <div className="feature-icon">
            ✦
          </div>

          <div className="feature-text">
            <strong>Wide Variety</strong>
            <span>Something for everyone</span>
          </div>

        </div>


        {/* Divider */}
        <div className="feature-divider"></div>


        {/* Feature 3 */}
        <div className="hero-feature">

          <div className="feature-icon">
            ♡
          </div>

          <div className="feature-text">
            <strong>Festive Moments</strong>
            <span>Made more memorable</span>
          </div>

        </div>


        {/* Divider */}
        <div className="feature-divider"></div>


        {/* Feature 4 */}
        <div className="hero-feature">

          <div className="feature-icon">
            ♧
          </div>

          <div className="feature-text">
            <strong>Celebrate Together</strong>
            <span>Joy for every occasion</span>
          </div>

        </div>

      </div>

    </section>
  );
}