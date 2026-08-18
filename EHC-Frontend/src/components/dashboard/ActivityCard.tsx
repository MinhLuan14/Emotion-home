import React from 'react';
import DashboardCard from './DashboardCard';
import './ActivityCard.css';

interface ActivityCardProps {
    data: number[];
}

const ActivityCard: React.FC<ActivityCardProps> = ({ data }) => {
    const hours = ['08', '10', '12', '14', '16', '18', '20', '22'];
    const maxValue = Math.max(...data);

    return (
        <DashboardCard title="📊 HOẠT ĐỘNG HÔM NAY" className="activity-card">
            <div className="activity-chart">
                <div className="chart-bars">
                    {data.map((value, index) => (
                        <div key={index} className="bar-container">
                            <div
                                className="bar"
                                style={{
                                    height: `${(value / maxValue) * 100}%`,
                                    backgroundColor: '#0284c7',
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
                <div className="chart-labels">
                    {hours.map((hour, index) => (
                        <div key={index} className="label">
                            {hour}
                        </div>
                    ))}
                </div>
            </div>
        </DashboardCard>
    );
};

export default ActivityCard;
