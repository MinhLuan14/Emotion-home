import React, { useState } from 'react';
import CameraViewer from '../../components/camera/CameraViewer';
import CameraStatus from '../../components/camera/CameraStatus';
import DetectionPanel from '../../components/camera/DetectionPanel';
import CameraEvents from '../../components/camera/CameraEvents';
import './Camera.css';

export default function CameraPage() {
    const [isRecording, setIsRecording] = useState(true);
    const [selectedCamera, setSelectedCamera] = useState('cam-01');

    return (
        <div className="ehc-camera-page">
            {/* Header trang */}
            <div className="camera-page-header">
                <div>
                    <h1 className="page-title">Camera Realtime</h1>
                    <p className="page-subtitle">Giám sát an toàn và phân tích trạng thái thời gian thực của Ông Minh</p>
                </div>

                {/* Chọn khu vực camera */}
                <div className="camera-selector-group">
                    <button
                        className={`cam-tab ${selectedCamera === 'cam-01' ? 'active' : ''}`}
                        onClick={() => setSelectedCamera('cam-01')}
                    >
                        🏠 Phòng Khách
                    </button>
                    <button
                        className={`cam-tab ${selectedCamera === 'cam-02' ? 'active' : ''}`}
                        onClick={() => setSelectedCamera('cam-02')}
                    >
                        🛏️ Phòng Ngủ
                    </button>
                </div>
            </div>

            {/* Lưới nội dung 2 cột: Trái (Video + Status), Phải (AI Detection + Events) */}
            <div className="camera-grid-layout">
                <div className="camera-main-column">
                    <CameraViewer cameraId={selectedCamera} isRecording={isRecording} />
                    <CameraStatus cameraId={selectedCamera} />
                </div>

                <div className="camera-sidebar-column">
                    <DetectionPanel />
                    <CameraEvents />
                </div>
            </div>
        </div>
    );
}