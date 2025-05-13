import React from "react";
import "../Style/Home.css";
import Chidiya from "../Model/DoorScene";

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <header className="hero">
        <h1>🌿 Virtual Herbal Garden</h1>
        <p>
          Explore a 3D world of medicinal plants, discover their benefits, and interact with nature in a whole new way.
        </p>
        <div className="hero-buttons">
          <a href="/World" className="btn primary">Explore Garden</a>
          <a href="/About" className="btn secondary">Learn More</a>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>🌱 Interactive 3D Plants</h3>
            <p>Click on plants to learn about their medicinal uses and history in vivid detail.</p>
          </div>
          <div className="card">
            <h3>🧠 AI Garden Assistant</h3>
            <p>Ask questions and get real-time information about plants with our AI-powered guide.</p>
          </div>
          <div className="card">
            <h3>🎮 Discovery Quizzes</h3>
            <p>Test your knowledge and unlock achievements by exploring different herbs.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About This Project</h2>
        <p>
          Our virtual herbal garden blends technology and tradition, offering a rich, immersive learning experience about herbal plants.
          Using 3D visualization, interactive quizzes, and an AI assistant, we bring centuries of botanical knowledge to your fingertips.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Virtual Herbal Garden — Crafted with 🌿 & ❤️ by [Team A4☘️☘️]
      </footer>

      <Chidiya />
    </div>
  );
}
