import React from 'react';

export default function CameraEvents() {
    return (
        <div className="camera-events-card">
            <div className="events-header">
                <h3 className="section-title">⏱️ Nhật ký sự kiện trong ngày</h3>
                <span className="clear-log-link">Xem tất cả</span>
            </div>

            <div className="event-timeline">
                <div className="timeline-item">
                    <span className="timeline-time">22:30</span>
                    <div className="timeline-content">
                        <p className="event-desc">Ông Minh di chuyển từ phòng ngủ ra phòng khách.</p>
                        <span className="event-tag info">Hành động</span>
                    </div>
                </div>

                <div className="timeline-item">
                    <span className="timeline-time">20:15</span>
                    <div className="timeline-content">
                        <p className="event-desc">Phát hiện biểu cảm mỉm cười khi trò chuyện với Robot.</p>
                        <span className="event-tag success">Cảm xúc</span>
                    </div>
                </div>

                <div className="timeline-item warning">
                    <span className="timeline-time">17:40</span>
                    <div className="timeline-content">
                        <p className="event-desc">Cảnh báo nhẹ: Ngồi quá lâu (&gt; 2 tiếng liên tục).</p>
                        <span className="event-tag warning">Nhắc nhở</span>
                    </div>
                </div>
            </div>
        </div>
    );
}