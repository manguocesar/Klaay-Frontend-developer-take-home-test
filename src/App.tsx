import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router';
import { Header } from './components/Header';
import { Login } from './pages/login';
import { Conversations } from './pages/conversation';
import { LogOut } from './components/LogOut';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';

const App: React.FC = () => {
  const { token } = useAuth();

  return (
    <div className="flex flex-col min-h-screen items-center  bg-gray-100 w-full">
      {token ? <LogOut /> : null}
      <Header />
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
      </Routes>
    </div>
  );
};

export { App };