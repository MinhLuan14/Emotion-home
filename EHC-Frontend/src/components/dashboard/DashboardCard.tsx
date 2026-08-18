import React from 'react';
import './DashboardCard.css';

interface DashboardCardProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, subtitle, children, className = '' }) => {
    return (
        <div className={`dashboard-card ${className}`}>
            {(title || subtitle) && (
                <div className="card-header">
                    {title && <h3 className="card-title">{title}</h3>}
                    {subtitle && <p className="card-subtitle">{subtitle}</p>}
                </div>
            )}
            <div className="card-content">{children}</div>
        </div>
    );
};

export default DashboardCard;
