import React from 'react';
import DashboardCard from './DashboardCard';
import './HappinessCard.css';

interface HappinessCardProps {
    score: number;
}

const HappinessCard: React.FC<HappinessCardProps> = ({ score }) => {
    const getLabel = (score: number) => {
        if (score >= 80) return 'Tốt';
        if (score >= 60) return 'Bình thường';
        if (score >= 40) return 'Trung bình';
        return 'Cần chú ý';
    };

    return (
        <DashboardCard title="⭐ ĐIỂM HẠNH PHÚC" className="happiness-card">
            <div className="happiness-content">
                <div className="score-display">
                    <div className="score-value">{score}</div>
                    <div className="score-max">/ 100</div>
                </div>
                <div className="score-label">{getLabel(score)}</div>
                <div className="score-bar">
                    <div className="score-fill" style={{ width: `${score}%` }}></div>
                </div>
            </div>
        </DashboardCard>
    );
};

export default HappinessCard;
