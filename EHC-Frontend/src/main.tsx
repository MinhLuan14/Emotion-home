import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/CSS/MainLayout.css' // Đảm bảo file CSS đã được import đúng đường dẫn

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)