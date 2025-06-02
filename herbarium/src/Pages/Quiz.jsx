'use client';

import { useState } from 'react';
import { fetchQuizByPlant } from '../api/quiz';
import { useQuiz } from '../context/quizContext';
import '../Style/IntroQuiz.css'
import {
  FaLeaf,
  FaSeedling,
  FaSpa,
  FaTrophy,
  FaMedal,
  FaStar,
  FaRedo,
  FaLightbulb,
  FaTimes,
} from 'react-icons/fa';
import '../Style/QuizPage.css';

const QuizPage = () => {
  const { quizData, setQuizData, score, setScore,highscore,setHighScore } = useQuiz();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      const questions = await fetchQuizByPlant();
      // console.log('questions : ', questions);
      if (!questions || !Array.isArray(questions)) {
        throw new Error('Invalid quiz data received');
      }
      setQuizData(questions);
      setCurrentIndex(0);
      setScore(0);
      setSelected('');
      setShowHint(false);
      setStarted(true);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const question = quizData?.[currentIndex];
  // console.log(`quizeData:-- `,question);
  const handleSubmit = () => {
    if (!question) return;
    if (selected === question.answer) {
      setScore((s) => s + 1);
    }

    setSelected('');
    setShowHint(false);
    setCurrentIndex((i) => i + 1);
  };


  const getScoreMessage = () => {
    const percentage = (score / quizData.length) * 100;

    if (percentage >= 90) {
      return {
        message: 'Herbal Master! 🌟',
        icon: <FaTrophy className="score-icon trophy" />,
      };
    }
    if (percentage >= 70) {
      return {
        message: 'Plant Expert! 🏆',
        icon: <FaMedal className="score-icon medal" />,
      };
    }
    if (percentage >= 50) {
      return {
        message: 'Nature Enthusiast! 🌿',
        icon: <FaStar className="score-icon star" />,
      };
    }
    return {
      message: 'Keep Learning! 📚',
      icon: <FaLeaf className="score-icon leaf" />,
    };
  };

  const IntroScreen = () => {
    return (
   <div className="intro-wrapper">
      {/* Animated Background */}
      <div className="bg-intro-gradient">
        <div className="bg-intro-pattern"></div>

        {/* Floating Elements */}
        <div className="floating-icon top-20 left-10 icon-delay-100">
          <FaLeaf className="text-4xl" />
        </div>
        <div className="floating-icon top-40 right-20 icon-delay-300">
          <FaSeedling className="text-3xl" />
        </div>
        <div className="floating-icon bottom-32 left-20 icon-delay-500">
          <FaSpa className="text-5xl" />
        </div>
        <div className="floating-icon bottom-20 right-10 icon-delay-700">
          <FaLeaf className="text-3xl" />
        </div>
      </div>

      {/* Content */}
      <div className="intro-content">
        <div className="space-y-8 max-w-4xl animate-fade-in">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="intro-title">
              <FaSpa className="animate-spin-slow" />
              <span>Virtual Herbal Garden Quiz</span>
            </h1>
          </div>

          {/* Description */}
          <div className="space-y-6 animate-fade-in-delayed">
            <p className="intro-description">
              Dive into the lush world of medicinal plants! Test your knowledge
              and discover ancient wisdom hidden in nature's bounty.
            </p>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="feature-card">
                <FaLeaf className="feature-icon" />
                <h3 className="feature-title">Learn & Discover</h3>
                <p className="feature-text">
                  Explore fascinating facts about medicinal plants
                </p>
              </div>
              <div className="feature-card">
                <FaLightbulb className="feature-icon" />
                <h3 className="feature-title">Get Hints</h3>
                <p className="feature-text">
                  Use helpful hints when you need guidance
                </p>
              </div>
              <div className="feature-card">
                <FaTrophy className="feature-icon" />
                <h3 className="feature-title">Earn Rewards</h3>
                <p className="feature-text">
                  Achieve different levels of herbal mastery
                </p>
              </div>
            </div>

            {/* Icon Display */}
            <div className="icon-row">
              <FaLeaf className="animate-bounce delay-100" />
              <FaSeedling className="animate-bounce delay-300" />
              <FaSpa className="animate-bounce delay-500" />
            </div>
          </div>

          {/* Start Button */}
          <div className="start-button-wrapper">
            <button onClick={startQuiz} className="cssbuttons-io-button">
              <span>Start the Journey 🌿</span>
              <span className="icon">
                <FaSeedling />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  
    );
  };

  const LoadingScreen = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200">
        <div className="text-center space-y-6 bg-white bg-opacity-80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl">
          <div className="relative">
            <FaSpa className="text-6xl text-green-600 animate-spin mx-auto" />
            <div className="absolute inset-0 animate-ping">
              <FaSpa className="text-6xl text-green-400 opacity-75 mx-auto" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-green-800 animate-pulse">
            Loading quiz questions...
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    );
  };

  const ErrorScreen = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-200 p-4">
        <div className="text-center space-y-6 bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full animate-scale-in">
          <FaTimes className="text-6xl text-red-500 mx-auto animate-pulse" />
          <h2 className="text-2xl font-bold text-red-700">
            Oops! Something went wrong
          </h2>
          <div className="text-lg font-semibold text-red-600 bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
            Error: {error}
          </div>
          <button
            onClick={startQuiz}
            className="px-8 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 hover:scale-105 font-semibold shadow-lg cursor-pointer"
          >
            <FaRedo className="inline mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  };

  const CompletionScreen = () => {
    const { message, icon } = getScoreMessage();
    const percentage = Math.round((score / quizData.length) * 100);

    // Create confetti elements
    const confettiElements = [];
    for (let i = 0; i < 20; i++) {
      confettiElements.push(
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          <FaStar className="text-yellow-300 text-2xl" />
        </div>
      );
    }

    return (
 <div className="completion-wrapper">
      {/* Animated Background */}
      <div className="completion-bg">
        <div className="completion-pattern"></div>
      </div>

      {/* Confetti Effect */}
      <div className="confetti-layer">
        {confettiElements}
      </div>

      {/* Content */}
      <div className="completion-content">
        <div className="completion-box">
          <div className="completion-icon">{icon}</div>

          <h2 className="completion-title">🎉 Quiz Complete! 🎉</h2>

          <div className="completion-score-section">
            <div className="completion-score">
              {score} / {quizData.length}
            </div>
            <div className="completion-percentage">
              {percentage}% Correct
            </div>
            <div className="completion-message">
              {message}
            </div>
          </div>

          <div className="completion-progress-wrapper">
            <div
              className="completion-progress-bar"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="completion-feedback">
            <p>
              {percentage >= 90 && "Outstanding! You're a true herbal expert! 🌟"}
              {percentage >= 70 && percentage < 90 && 'Great job! You have excellent knowledge of medicinal plants! 🏆'}
              {percentage >= 50 && percentage < 70 && 'Good work! Keep exploring the world of herbal medicine! 🌿'}
              {percentage < 50 && 'Every expert was once a beginner. Keep learning and growing! 📚'}
            </p>
          </div>

          <button
            onClick={() => setStarted(false)}
            className="completion-button"
          >
            <FaRedo className="mr-3" />
            Take Quiz Again
          </button>
        </div>
      </div>
    </div>
    );
  };

  const QuizScreen = () => {
    return (
    <div className="quiz-root">
      {/* Background */}
      <div className="quiz-background">
        <div className="quiz-pattern bg-pattern-quiz"></div>
        <div className="quiz-floating">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="quiz-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="quiz-center">
        <div className="quiz-inner">
          <div className="quiz-box">
            <div className="quiz-header">
              <span className="quiz-status">Question {currentIndex + 1} of {quizData.length}</span>
              <span className="quiz-score">Score: {score}</span>
            </div>

            <div className="quiz-progress-wrapper">
              <div
                className="quiz-progress-bar"
                style={{ width: `${((currentIndex + 1) / quizData.length) * 100}%` }}
              ></div>
            </div>

            <div className="quiz-question">{question.question}</div>

            <ul className="quiz-options">
              {question.options?.map((opt, i) => (
                <li key={i}>
                  <label className={`quiz-option ${selected === opt ? 'active' : ''}`}>
                    <div className="quiz-option-inner">
                      <input
                        type="radio"
                        name="option"
                        value={opt}
                        checked={selected === opt}
                        onChange={() => setSelected(opt)}
                        className="quiz-radio"
                      />
                      <span>{opt}</span>
                    </div>
                  </label>
                </li>
              ))}
            </ul>

            {showHint && question.hint && (
              <div className="quiz-hint">
                <FaLightbulb className="text-yellow-500 text-2xl mt-1 animate-pulse" />
                <p><strong>💡 Hint:</strong> {question.hint}</p>
              </div>
            )}

            <div className="quiz-actions">
              <button
                onClick={() => setShowHint(!showHint)}
                className="quiz-button hint"
              >
                <FaLightbulb className="inline mr-2" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>

              <button
                onClick={handleSubmit}
                disabled={!selected}
                className={`quiz-button submit ${!selected ? 'disabled' : ''}`}
              >
                Submit Answer ✨
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
    );
  };

  if (error) return <ErrorScreen />;
  if (loading) return <LoadingScreen />;
  if (!started) return <IntroScreen />;
  if (currentIndex >= quizData.length) return <CompletionScreen />;

  return <QuizScreen />;
};

export default QuizPage;
