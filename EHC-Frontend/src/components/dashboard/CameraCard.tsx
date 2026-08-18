import React from 'react';
import DashboardCard from './DashboardCard';
import './CameraCard.css';

interface CameraCardProps {
    online: boolean;
}

const CameraCard: React.FC<CameraCardProps> = ({ online }) => {
    return (
        <DashboardCard title="📷 CAMERA REALTIME" className="camera-card">
            <div className="camera-feed">
                <div className="camera-placeholder">
                    <div className="camera-icon">📹</div>
                    <div className="camera-text">CAMERA FEED</div>
                    <div className={`camera-status ${online ? 'online' : 'offline'}`}>
                        <span className={`status-dot ${online ? 'live' : ''}`}></span>
                        {online ? '🟢 LIVE' : '🔴 OFFLINE'}
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
};

export default CameraCard;
