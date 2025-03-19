import React, { Suspense } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router';
import { Header } from './components/Header';
import { LogOut } from './components/LogOut';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';

const Login = React.lazy(() => import('./pages/login'));
const Conversations = React.lazy(() => import('./pages/conversation'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));

const App: React.FC = () => {
  const { token } = useAuth();

  return (
    <div className="flex flex-col min-h-screen items-center  bg-gray-100 w-full">
      {token ? <LogOut /> : null}
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            index
            element={token ? <Navigate to="/conversations" /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/conversations"
            element={
              <ProtectedRoute>
                <ChatProvider>
                  <Conversations />
                </ChatProvider>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export { App };