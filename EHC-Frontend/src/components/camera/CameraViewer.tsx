import React from 'react';

interface CameraViewerProps {
    cameraId: string;
    isRecording: boolean;
}

export default function CameraViewer({ cameraId, isRecording }: CameraViewerProps) {
    return (
        <div className="camera-viewer-card">
            <div className="viewer-header">
                <div className="viewer-title-wrap">
                    <span className="live-dot-pulse"></span>
                    <span className="viewer-title">TRỰC TIẾP — {cameraId === 'cam-01' ? 'Phòng Khách' : 'Phòng Ngủ'}</span>
                </div>
                <div className="viewer-badges">
                    <span className="badge-hq">HD 1080p</span>
                    <span className="badge-fps">30 FPS</span>
                </div>
            </div>

            {/* Khung hiển thị video giả lập hoặc thẻ video stream */}
            <div className="video-viewport">
                {/* Giả lập khung hình camera với hiệu ứng AI Bounding Box */}
                <div className="ai-bounding-box" style={{ top: '35%', left: '40%', width: '120px', height: '220px' }}>
                    <span className="ai-tag">Ông Minh (98%) - Đang ngồi</span>
                </div>

                <div className="video-watermark">EHC SECURE STREAM - ZERO CLOUD</div>
            </div>

            {/* Thanh công cụ điều khiển nhanh bên dưới video */}
            <div className="viewer-toolbar">
                <div className="toolbar-left">
                    <button className="tool-btn active" title="Bật/Tắt Mic">🎤 Âm thanh</button>
                    <button className="tool-btn" title="Chụp ảnh nhanh">📸 Chụp màn hình</button>
                </div>
                <div className="toolbar-right">
                    <button className="tool-btn danger-outline" title="Báo động còi">🚨 Hú còi tại chỗ</button>
                    <button className="tool-btn primary" title="Phóng to toàn màn hình">⛶ Phóng to</button>
                </div>
            </div>
        </div>
    );
}