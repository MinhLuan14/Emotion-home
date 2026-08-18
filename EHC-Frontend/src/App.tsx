import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Camera from './pages/Camera/Camera';
import Profile from './pages/Profile';

const CameraRealtime = () => <div className="p-4"><h2>CameAra Realtime</h2></div>;
const Emotion = () => <div className="p-4"><h2>Quản lý Cảm xúc</h2></div>;
const Activity = () => <div className="p-4"><h2>Theo dõi Hoạt động</h2></div>;
const Alerts = () => <div className="p-4"><h2>Cảnh báo khẩn cấp</h2></div>;
const Chat = () => <div className="p-4"><h2>Trò chuyện với AI</h2></div>;
const History = () => <div className="p-4"><h2>Lịch sử giám sát</h2></div>;
const Happiness = () => <div className="p-4"><h2>Điểm hạnh phúc</h2></div>;
const Devices = () => <div className="p-4"><h2>Quản lý thiết bị Edge AI</h2></div>;
const Settings = () => <div className="p-4"><h2>Cài đặt hệ thống</h2></div>;
const Privacy = () => <div className="p-4"><h2>Bảo mật (Zero-Cloud)</h2></div>;

function App() {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthRoute) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/emotion" element={<Emotion />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/history" element={<History />} />
        <Route path="/happiness" element={<Happiness />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </MainLayout>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}