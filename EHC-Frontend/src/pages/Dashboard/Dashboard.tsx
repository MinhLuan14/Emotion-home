import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import StatusOverview from '../../components/dashboard/StatusOverview';
import CameraCard from '../../components/dashboard/CameraCard';
import EmotionCard from '../../components/dashboard/EmotionCard';
import ActivityCard from '../../components/dashboard/ActivityCard';
import HappinessCard from '../../components/dashboard/HappinessCard';
import AIInsightCard from '../../components/dashboard/AIInsightCard';
import AlertsCard from '../../components/dashboard/AlertsCard';

interface DashboardData {
    safetyStatus: 'safe' | 'warning' | 'critical';
    activityStatus: 'active' | 'resting' | 'unknown';
    emotionStatus: string;
    cameraOnline: boolean;
    alerts: {
        count: number;
        message: string;
        severity: 'info' | 'warning' | 'critical';
    };
    happinessScore: number;
    emotionToday: {
        primary: string;
        percentage: number;
    };
    activityData: number[];
    aiInsight: string;
}

const Dashboard: React.FC = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        safetyStatus: 'safe',
        activityStatus: 'active',
        emotionStatus: '😊 Vui vẻ',
        cameraOnline: true,
        alerts: {
            count: 0,
            message: 'Không có cảnh báo nghiêm trọng',
            severity: 'info',
        },
        happinessScore: 82,
        emotionToday: {
            primary: '😊 Vui vẻ',
            percentage: 72,
        },
        activityData: [2, 5, 8, 6, 3, 7, 4, 9],
        aiInsight: 'Hôm nay ông có vẻ khá vui vẻ.',
    });

    useEffect(() => {
        // TODO: Fetch real data from API
        // const fetchDashboardData = async () => {
        //   const response = await fetch('/api/dashboard');
        //   const data = await response.json();
        //   setDashboardData(data);
        // };
        // fetchDashboardData();
    }, []);

    return (
        <div className="dashboard-container">
            {/* Page Title */}
            <div className="dashboard-header">
                <h1>Tổng quan</h1>
                <p className="dashboard-subtitle">Theo dõi tình trạng hiện tại của Ông Minh</p>
            </div>

            {/* Status Overview - 5 Questions */}
            <StatusOverview
                safety={dashboardData.safetyStatus}
                activity={dashboardData.activityStatus}
                emotion={dashboardData.emotionStatus}
            />

            {/* Main Content Grid */}
            <div className="dashboard-grid">
                {/* Left Column */}
                <div className="dashboard-column-left">
                    {/* Camera Section */}
                    <CameraCard online={dashboardData.cameraOnline} />

                    {/* Emotion Summary */}
                    <EmotionCard emotion={dashboardData.emotionToday.primary} percentage={dashboardData.emotionToday.percentage} />

                    {/* Happiness Score */}
                    <HappinessCard score={dashboardData.happinessScore} />
                </div>

                {/* Right Column */}
                <div className="dashboard-column-right">
                    {/* Alerts */}
                    <AlertsCard alerts={dashboardData.alerts} />

                    {/* Activity Summary */}
                    <ActivityCard data={dashboardData.activityData} />

                    {/* AI Companion */}
                    <AIInsightCard insight={dashboardData.aiInsight} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
