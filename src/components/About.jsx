import React from "react";
import Reveal from "./Reveal.jsx";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="about-section">
      <Reveal className="about-wrapper">

        {/* LEFT CONTENT */}
        <div className="about-content">

          <span className="about-eyebrow about-animate about-delay-1">
            ABOUT CHANDRU CRACKERS
          </span>

          <h2 className="about-title about-animate about-delay-2">
            Celebrating Every Moment
            <span> With a Spark</span>
          </h2>

          <p className="about-text about-animate about-delay-3">
            Chandru Crackers is a proud branch of
            <strong> Amutham Crackers Shop</strong>, carrying forward a
            tradition built on quality, customer trust, and reliable service.
            Our aim is to provide customers with a convenient and enjoyable
            fireworks shopping experience for every special occasion.
          </p>

          <p className="about-text about-animate about-delay-4">
            From family celebrations and festivals to special occasions,
            we offer a wide variety of fireworks carefully selected to bring
            excitement and joy to every celebration.
          </p>

          {/* PROPRIETOR */}
          <div className="about-proprietor about-animate about-delay-5">
            <div className="proprietor-icon">✦</div>

            <div className="proprietor-info">
              <span>PROPRIETOR</span>
              <strong>Chandru Crackers</strong>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="about-highlights">

          <div className="about-card about-card-main about-card-animate">
            <div className="about-card-icon">✨</div>

            <div>
              <h3>Quality &amp; Trust</h3>
              <p>
                Bringing trusted fireworks and dependable service
                to every celebration.
              </p>
            </div>
          </div>

          <div className="about-card about-card-animate">
            <div className="about-card-icon">🎆</div>

            <div>
              <h3>Wide Variety</h3>
              <p>
                A diverse collection of crackers and fireworks
                for every occasion.
              </p>
            </div>
          </div>

          <div className="about-card about-card-animate">
            <div className="about-card-icon">🎉</div>

            <div>
              <h3>Festive Celebrations</h3>
              <p>
                Making festivals, family gatherings, and special
                moments even more memorable.
              </p>
            </div>
          </div>

          <div className="about-card about-card-animate">
            <div className="about-card-icon">🤝</div>

            <div>
              <h3>Customer First</h3>
              <p>
                We value our customers and strive to provide
                a friendly and convenient experience.
              </p>
            </div>
          </div>

        </div>
      </Reveal>
    </section>
  );
}
