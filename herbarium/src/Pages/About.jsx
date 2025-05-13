import React from 'react';
import '../Style/About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-header">
        <h1 className="about-title">About Virtual Herbal Garden</h1>
        <p className="about-subtitle">
          A final-year B.Tech project created with a vision to revive the wisdom
          of traditional herbal medicine in a modern, interactive way.
        </p>
      </section>

      <section className="about-mission-section">
        <div className="about-mission-text">
          <h2 className="section-title">🌱 Our Mission</h2>
          <p>
            In a world overwhelmed by synthetic solutions, our goal is to raise
            awareness about the power and purity of herbal remedies rooted in
            ancient AYUSH practices. Through a 3D interactive experience, we aim
            to reconnect people with nature and promote a sustainable, holistic
            approach to health.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
          alt="Herbal plants"
          className="about-image"
        />
      </section>

      <section className="about-who-we-are">
        <h2 className="section-title">👨‍💻 Who We Are</h2>
        <p>
          We are a team of final-year B.Tech Computer Science students
          passionate about combining technology and tradition. Inspired by the
          healing power of herbs, we’ve developed a virtual garden using modern
          web technologies like React, Three.js, and Firebase — making learning
          about herbs not only educational but also immersive and engaging.
        </p>
      </section>

      <section className="about-why-herbal">
        <h2 className="section-title">🌿 Why Herbal?</h2>
        <ul>
          <li>Herbal remedies have fewer side effects and are naturally sourced.</li>
          <li>
            They form the foundation of ancient medicinal systems like Ayurveda
            and Siddha.
          </li>
          <li>
            Encourages sustainable living and self-care using nature's resources.
          </li>
        </ul>
      </section>

      <section className="about-join-us">
        <h2>Join us in rediscovering nature’s pharmacy.</h2>
        <p>Explore. Learn. Heal.</p>
      </section>
    </div>
  );
};

export default About;
 