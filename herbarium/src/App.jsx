import { useState } from 'react';
import './App.css';
import Home from './Pages/Home';
import About from './Pages/About';
import World from './Pages/World';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AuthUI from './Components/authentication/Auth-ui';
import ProtectedRoute from './routes/ProtectedRoute';
import MainLayout from './layout/MainLayout';
import { ChatPanelProvider } from './context/ChatPanelContext';
import { QuizProvider } from './context/quizContext';
import Quiz from './Pages/Quiz';
import Display from './Pages/display';

function App() {
  return (
    <Router>
      <ChatPanelProvider>
        <Routes>
          {/* Public Route (no navbar) */}
          <Route path="/" element={<AuthUI />} />

          {/* Protected Routes with shared layout */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/world"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <World />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <About />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          {/* ✅ New Quiz Route */}
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <QuizProvider>
                  <MainLayout>
                    <Quiz />
                  </MainLayout>
                </QuizProvider>
              </ProtectedRoute>
            }
          />
          <Route
          path = '/display'
          element={
            <QuizProvider><Display /></QuizProvider>
          }
          />
        </Routes>
      </ChatPanelProvider>
    </Router>
  );
}

export default App;
