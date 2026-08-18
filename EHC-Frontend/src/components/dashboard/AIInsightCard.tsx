import React from 'react';
import DashboardCard from './DashboardCard';
import './AIInsightCard.css';

interface AIInsightCardProps {
    insight: string;
}

const AIInsightCard: React.FC<AIInsightCardProps> = ({ insight }) => {
    return (
        <DashboardCard title="🤖 AI COMPANION" className="ai-insight-card">
            <div className="insight-content">
                <div className="insight-quote">"{insight}"</div>
            </div>
        </DashboardCard>
    );
};

export default AIInsightCard;
