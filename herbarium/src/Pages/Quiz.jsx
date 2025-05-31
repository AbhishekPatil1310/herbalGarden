'use client';

import { useState } from 'react';
import { fetchQuizByPlant } from '../api/quiz';
import { useQuiz } from '../context/quizContext';
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
  const { quizData, setQuizData, score, setScore } = useQuiz();
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
      console.log('questions : ', questions);
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
        icon: <FaTrophy className="text-yellow-500" />,
      };
    }
    if (percentage >= 70) {
      return {
        message: 'Plant Expert! 🏆',
        icon: <FaMedal className="text-amber-500" />,
      };
    }
    if (percentage >= 50) {
      return {
        message: 'Nature Enthusiast! 🌿',
        icon: <FaStar className="text-green-500" />,
      };
    }
    return {
      message: 'Keep Learning! 📚',
      icon: <FaLeaf className="text-green-500" />,
    };
  };

  const IntroScreen = () => {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600">
          <div className="absolute inset-0 bg-pattern animate-pulse"></div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 animate-bounce delay-100">
            <FaLeaf className="text-white opacity-30 text-4xl" />
          </div>
          <div className="absolute top-40 right-20 animate-bounce delay-300">
            <FaSeedling className="text-white opacity-30 text-3xl" />
          </div>
          <div className="absolute bottom-32 left-20 animate-bounce delay-500">
            <FaSpa className="text-white opacity-30 text-5xl" />
          </div>
          <div className="absolute bottom-20 right-10 animate-bounce delay-700">
            <FaLeaf className="text-white opacity-30 text-3xl" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center p-6 transition-all">
          <div className="space-y-8 max-w-4xl animate-fade-in">
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl animate-slide-down flex items-center justify-center gap-3 flex-wrap">
                <FaSpa className="text-white animate-spin-slow" />
                <span>Virtual Herbal Garden Quiz</span>
              </h1>
            </div>

            {/* Description */}
            <div className="space-y-6 animate-fade-in-delayed">
              <p className="text-lg md:text-xl text-white opacity-90 max-w-3xl mx-auto leading-relaxed">
                Dive into the lush world of medicinal plants! Test your
                knowledge and discover ancient wisdom hidden in nature's bounty.
              </p>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 hover:bg-white hover:bg-opacity-20 transition-all duration-300 hover:scale-105">
                  <FaLeaf className="text-3xl text-white mb-3 mx-auto" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Learn & Discover
                  </h3>
                  <p className="text-white opacity-80 text-sm">
                    Explore fascinating facts about medicinal plants
                  </p>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 hover:bg-white hover:bg-opacity-20 transition-all duration-300 hover:scale-105">
                  <FaLightbulb className="text-3xl text-white mb-3 mx-auto" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Get Hints
                  </h3>
                  <p className="text-white opacity-80 text-sm">
                    Use helpful hints when you need guidance
                  </p>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 hover:bg-white hover:bg-opacity-20 transition-all duration-300 hover:scale-105">
                  <FaTrophy className="text-3xl text-white mb-3 mx-auto" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Earn Rewards
                  </h3>
                  <p className="text-white opacity-80 text-sm">
                    Achieve different levels of herbal mastery
                  </p>
                </div>
              </div>

              {/* Icon Display */}
              <div className="flex justify-center gap-8 text-4xl text-white opacity-80 my-8">
                <FaLeaf className="animate-bounce delay-100" />
                <FaSeedling className="animate-bounce delay-300" />
                <FaSpa className="animate-bounce delay-500" />
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-8 animate-bounce-gentle">
              <button
                onClick={startQuiz}
                className="group relative px-12 py-4 bg-white text-green-700 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 hover:bg-green-50 cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <FaSeedling className="group-hover:animate-spin" />
                  Start the Journey 🌿
                  <FaSeedling className="group-hover:animate-spin" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
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
      <div className="h-screen w-full relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
          <div className="absolute inset-0 bg-pattern-completion animate-pulse"></div>
        </div>

        {/* Confetti Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confettiElements}
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center text-center p-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-3xl max-w-4xl w-full space-y-8 animate-scale-in">
            {/* Trophy/Icon - Larger */}
            <div className="text-9xl animate-bounce">{icon}</div>

            {/* Title - Larger */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 animate-slide-down">
              🎉 Quiz Complete! 🎉
            </h2>

            {/* Score Display - Larger and more prominent */}
            <div className="space-y-6">
              <div className="text-6xl md:text-7xl font-bold text-green-600 animate-count-up">
                {score} / {quizData.length}
              </div>
              <div className="text-3xl md:text-4xl text-gray-600">
                {percentage}% Correct
              </div>
              <div className="text-3xl md:text-4xl font-semibold text-purple-600 animate-pulse">
                {message}
              </div>
            </div>

            {/* Progress Bar - Larger */}
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out animate-progress"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>

            {/* Performance Message - Larger */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border-l-4 border-green-500">
              <p className="text-2xl text-gray-700">
                {percentage >= 90 &&
                  "Outstanding! You're a true herbal expert! 🌟"}
                {percentage >= 70 &&
                  percentage < 90 &&
                  'Great job! You have excellent knowledge of medicinal plants! 🏆'}
                {percentage >= 50 &&
                  percentage < 70 &&
                  'Good work! Keep exploring the world of herbal medicine! 🌿'}
                {percentage < 50 &&
                  'Every expert was once a beginner. Keep learning and growing! 📚'}
              </p>
            </div>

            {/* Action Button - Larger */}
            <button
              onClick={() => setStarted(false)}
              className="px-10 py-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer"
            >
              <FaRedo className="inline mr-3" />
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  };

  const QuizScreen = () => {
    return (
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600">
          <div className="absolute inset-0 bg-pattern-quiz"></div>

          {/* Floating particles for visual appeal */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 2}s`,
                }}
              >
                <div className="w-2 h-2 bg-white bg-opacity-20 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Content - Full viewport with perfect centering */}
        <div className="relative z-10 min-h-screen w-full flex items-center justify-center p-8 md:p-12 lg:p-16">
          <div className="w-full max-w-4xl mx-auto">
            {/* Quiz Container - Centered with generous spacing */}
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 space-y-10 transform hover:scale-101 transition-all duration-500">
              {/* Progress Header */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl md:text-2xl font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
                    Question {currentIndex + 1} of {quizData.length}
                  </span>
                  <span className="text-xl md:text-2xl font-bold text-green-600 bg-green-100 px-4 py-2 rounded-full">
                    Score: {score}
                  </span>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out shadow-lg"
                    style={{
                      width: `${((currentIndex + 1) / quizData.length) * 100}%`,
                    }}
                  >
                    <div className="h-full bg-white bg-opacity-30 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Question Section - Perfectly centered with larger font */}
              <div className="space-y-8 text-center">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-relaxed px-4 md:px-8 lg:px-12 py-6">
                  {question.question}
                </h3>

                {/* Options - Enhanced with better spacing and no flickering */}
                <ul className="space-y-6 px-4 md:px-8 lg:px-16">
                  {question.options?.map((opt, i) => (
                    <li key={i}>
                      <label
                        className={`
                        block p-6 md:p-8 rounded-2xl border-3 cursor-pointer 
                        transition-all duration-300 ease-in-out
                        transform hover:scale-102 active:scale-98
                        ${
                          selected === opt
                            ? 'border-blue-500 bg-blue-50 shadow-xl ring-4 ring-blue-200'
                            : 'border-gray-300 hover:border-blue-300 hover:bg-blue-25 hover:shadow-lg'
                        }
                      `}
                      >
                        <div className="flex items-center space-x-6 text-gray-800">
                          <input
                            type="radio"
                            name="option"
                            value={opt}
                            checked={selected === opt}
                            onChange={() => setSelected(opt)}
                            className="w-6 h-6 text-blue-600 cursor-pointer scale-125"
                          />
                          <span className="text-xl md:text-2xl font-semibold flex-1 text-left cursor-pointer">
                            {opt}
                          </span>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hint Section - Enhanced */}
              {showHint && question.hint && (
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 p-6 md:p-8 rounded-r-2xl animate-slide-down shadow-lg mx-4 md:mx-8 lg:mx-16">
                  <div className="flex items-start space-x-4">
                    <FaLightbulb className="text-yellow-500 text-2xl mt-1 animate-pulse" />
                    <p className="text-xl md:text-2xl text-yellow-800 font-medium">
                      <strong>💡 Hint:</strong> {question.hint}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons - Enhanced with better styling */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8 px-4 md:px-8 lg:px-16">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="
                    flex-1 px-8 py-4 md:py-5 bg-gradient-to-r from-yellow-400 to-amber-500 
                    text-yellow-900 rounded-2xl text-xl md:text-2xl font-bold 
                    hover:from-yellow-500 hover:to-amber-600 
                    transition-all duration-300 ease-in-out
                    transform hover:scale-105 active:scale-95
                    shadow-lg hover:shadow-xl cursor-pointer
                    border-2 border-yellow-300 hover:border-yellow-400
                  "
                >
                  <FaLightbulb className="inline mr-3" />
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>

                <button
                  disabled={!selected}
                  onClick={handleSubmit}
                  className={`
                    flex-1 px-8 py-4 md:py-5 rounded-2xl text-xl md:text-2xl font-bold 
                    transition-all duration-300 ease-in-out
                    transform active:scale-95 shadow-lg
                    ${
                      selected
                        ? `bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                         text-white hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 
                         hover:scale-105 hover:shadow-xl cursor-pointer
                         border-2 border-blue-400 hover:border-blue-500`
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-gray-300'
                    }`}
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
