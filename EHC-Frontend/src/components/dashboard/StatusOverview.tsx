import React from 'react';
import './StatusOverview.css';

interface StatusOverviewProps {
    safety: 'safe' | 'warning' | 'critical';
    activity: 'active' | 'resting' | 'unknown';
    emotion: string;
}

const statusConfig = {
    safety: {
        safe: { icon: '🟢', label: 'AN TOÀN', message: 'Hệ thống bình thường' },
        warning: { icon: '🟡', label: 'CẢNH BÁO', message: 'Cần chú ý' },
        critical: { icon: '🔴', label: 'NGUY HIỂM', message: 'Cần hành động ngay' },
    },
    activity: {
        active: { icon: '🏃', label: 'ĐANG HOẠT ĐỘNG', message: 'Đi bộ' },
        resting: { icon: '😴', label: 'ĐANG NGHỈ', message: 'Ngủ/Yên tĩnh' },
        unknown: { icon: '❓', label: 'CHƯA RÕ', message: 'Không xác định' },
    },
};

const StatusOverview: React.FC<StatusOverviewProps> = ({ safety, activity, emotion }) => {
    const safetyInfo = statusConfig.safety[safety];
    const activityInfo = statusConfig.activity[activity];

    return (
        <div className="status-overview-card">
            <div className="status-grid">
                <div className="status-item">
                    <div className="status-icon">{safetyInfo.icon}</div>
                    <div className="status-info">
                        <div className="status-label">{safetyInfo.label}</div>
                        <div className="status-message">{safetyInfo.message}</div>
                    </div>
                </div>

                <div className="status-item">
                    <div className="status-icon">{emotion.split(' ')[0]}</div>
                    <div className="status-info">
                        <div className="status-label">{emotion.split(' ').slice(1).join(' ').toUpperCase()}</div>
                        <div className="status-message">Cảm xúc tốt</div>
                    </div>
                </div>

                <div className="status-item">
                    <div className="status-icon">{activityInfo.icon}</div>
                    <div className="status-info">
                        <div className="status-label">{activityInfo.label}</div>
                        <div className="status-message">{activityInfo.message}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusOverview;
