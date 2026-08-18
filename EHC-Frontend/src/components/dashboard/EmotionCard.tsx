import React from 'react';
import DashboardCard from './DashboardCard';
import './EmotionCard.css';

interface EmotionCardProps {
    emotion: string;
    percentage: number;
}

const EmotionCard: React.FC<EmotionCardProps> = ({ emotion, percentage }) => {
    return (
        <DashboardCard title={`${emotion.split(' ')[0]} CẢM XÚC HÔM NAY`} className="emotion-card">
            <div className="emotion-content">
                <div className="emotion-display">
                    <div className="emotion-label">{emotion}</div>
                    <div className="emotion-percentage">{percentage}%</div>
                </div>
            </div>
        </DashboardCard>
    );
};

export default EmotionCard;
