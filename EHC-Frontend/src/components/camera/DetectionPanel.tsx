import React from 'react';

export default function DetectionPanel() {
    return (
        <div className="detection-panel-card">
            <h3 className="section-title">🧠 Phân tích AI Realtime</h3>

            <div className="detection-item">
                <div className="det-icon-box emotion">😊</div>
                <div className="det-info">
                    <span className="det-label">Cảm xúc hiện tại</span>
                    <span className="det-val">Thoải mái, Vui vẻ (85%)</span>
                </div>
                <span className="status-pill green">Bình thường</span>
            </div>

            <div className="detection-item">
                <div className="det-icon-box posture">🚶‍♂️</div>
                <div className="det-info">
                    <span className="det-label">Hành vi cơ thể</span>
                    <span className="det-val">Đang ngồi ghế sofa xem tivi</span>
                </div>
                <span className="status-pill green">An toàn</span>
            </div>

            <div className="detection-item">
                <div className="det-icon-box environment">🌡️</div>
                <div className="det-info">
                    <span className="det-label">Môi trường phòng</span>
                    <span className="det-val">27°C • Độ ẩm 65%</span>
                </div>
                <span className="status-pill blue">Lý tưởng</span>
            </div>
        </div>
    );
}