import React from 'react';

interface CameraStatusProps {
    cameraId: string;
}

export default function CameraStatus({ cameraId }: CameraStatusProps) {
    const roomLabel = cameraId === 'cam-01' ? 'Phòng Khách' : 'Phòng Ngủ';

    return (
        <div className="camera-status-card">
            <h3 className="section-title">Trạng thái hệ thống AI & Thiết bị — {roomLabel}</h3>
            <div className="status-metrics-grid">
                <div className="metric-item">
                    <span className="metric-label">Độ trễ (Latency)</span>
                    <span className="metric-value text-success">18 ms (Cực tốt)</span>
                </div>
                <div className="metric-item">
                    <span className="metric-label">Mô hình AI Pose</span>
                    <span className="metric-value">YOLOv8 + MediaPipe</span>
                </div>
                <div className="metric-item">
                    <span className="metric-label">Kết nối phần cứng</span>
                    <span className="metric-value text-success">Ổn định (Wi-Fi 5G)</span>
                </div>
                <div className="metric-item">
                    <span className="metric-label">Bảo mật luồng</span>
                    <span className="metric-value badge-encrypted">🔒 End-to-End</span>
                </div>
            </div>
        </div>
    );
}