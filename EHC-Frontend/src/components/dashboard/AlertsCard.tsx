import React from 'react';
import DashboardCard from './DashboardCard';
import './AlertsCard.css';

interface Alert {
    count: number;
    message: string;
    severity: 'info' | 'warning' | 'critical';
}

interface AlertsCardProps {
    alerts: Alert;
}

const AlertsCard: React.FC<AlertsCardProps> = ({ alerts }) => {
    const severityConfig = {
        info: { color: '#3b82f6', icon: 'ℹ️' },
        warning: { color: '#f59e0b', icon: '⚠️' },
        critical: { color: '#ef4444', icon: '🚨' },
    };

    const config = severityConfig[alerts.severity];

    return (
        <DashboardCard title={`${config.icon} CẢNH BÁO`} className="alerts-card">
            <div className={`alert-content alert-${alerts.severity}`}>
                <div className="alert-message">{alerts.message}</div>
                <div className="alert-footer">
                    {alerts.count === 0 ? (
                        <div className="alert-check">✓ Hệ thống OK</div>
                    ) : (
                        <div className="alert-count">{alerts.count} cảnh báo</div>
                    )}
                </div>
            </div>
        </DashboardCard>
    );
};

export default AlertsCard;
