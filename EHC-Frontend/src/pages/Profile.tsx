import React, { useState, useEffect } from "react";
import "./Profile.css";

interface UserProfile {
    maTaiKhoan: number;
    maNguoiThan: number;
    hoTen: string;
    email: string;
    soDienThoai: string;
    anhDaiDien: string;
    vaiTro: string;
    trangThai: string;
    gioiTinh: string;
    ngaySinh: string;
    diaChi: string;
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserProfile>({
        maTaiKhoan: 1,
        maNguoiThan: 1,
        hoTen: "Đang tải...",
        email: "Đang tải...",
        soDienThoai: "",
        anhDaiDien: "",
        vaiTro: "Người thân",
        trangThai: "Hoạt động",
        gioiTinh: "",
        ngaySinh: "",
        diaChi: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Fetch profile data from backend
    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const maTaiKhoan = localStorage.getItem("maTaiKhoan") || "1";
            const response = await fetch(`http://localhost:8080/api/profile/${maTaiKhoan}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                throw new Error("Không thể tải dữ liệu hồ sơ");
            }

            const data: UserProfile = await response.json();
            setUser(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Lỗi khi tải dữ liệu");
            console.error("Error fetching profile:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?")) {
            localStorage.removeItem("token");
            localStorage.removeItem("maTaiKhoan");
            window.location.href = "/login";
        }
    };

    const handlePasswordChange = async () => {
        if (!newPassword || !confirmPassword) {
            alert("Vui lòng điền đầy đủ thông tin mật khẩu mới.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("Mật khẩu xác nhận không trùng khớp.");
            return;
        }
        try {
            const maTaiKhoan = localStorage.getItem("maTaiKhoan") || user.maTaiKhoan;
            const response = await fetch(`http://localhost:8080/api/profile/${maTaiKhoan}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ newPassword })
            });

            if (!response.ok) {
                throw new Error("Lỗi khi đổi mật khẩu");
            }

            alert("Đổi mật khẩu thành công!");
            setShowPasswordModal(false);
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            alert(err instanceof Error ? err.message : "Lỗi khi đổi mật khẩu");
        }
    };

    if (loading) {
        return <div className="profile-loading">Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div className="profile-error">Lỗi: {error}</div>;
    }

    return (
        <div className="ehc-profile-wrapper">
            {/* Header trang */}
            <div className="profile-top-banner">
                <div className="banner-text">
                    <h1>Hồ Sơ & Tài Khoản</h1>
                    <p>Quản lý thông tin định danh và bảo mật cho hệ thống đồng hành gia đình.</p>
                </div>
                <button className="ehc-btn-logout-top" onClick={handleLogout}>
                    <span>🚪</span> Đăng xuất
                </button>
            </div>

            <div className="profile-dashboard-grid">
                {/* Cột trái: Thẻ tóm tắt thông tin cá nhân */}
                <div className="profile-card user-overview-card">
                    <div className="avatar-wrapper">
                        <div className="user-avatar-circle">
                            <span>{user.hoTen ? user.hoTen.charAt(0).toUpperCase() : "?"}</span>
                        </div>
                        <span className="online-badge-dot" title="Đang hoạt động"></span>
                    </div>

                    <h3 className="user-profile-name">{user.hoTen}</h3>
                    <p className="user-profile-email">{user.email}</p>

                    <div className="user-badges-container">
                        <span className="badge-pill role-badge">🛡️ {user.vaiTro}</span>
                        <span className="badge-pill status-active-badge">🟢 {user.trangThai}</span>
                    </div>

                    <div className="quick-stats-box">
                        <div className="stat-item">
                            <span className="stat-label">Mã định danh</span>
                            <span className="stat-val">#{user.maTaiKhoan}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Hệ thống</span>
                            <span className="stat-val">EHC v1.0</span>
                        </div>
                    </div>
                </div>

                {/* Cột phải: Chi tiết thông tin & Cài đặt bảo mật */}
                <div className="profile-main-content">
                    {/* Thông tin chi tiết */}
                    <div className="profile-card">
                        <div className="card-section-header">
                            <h2>📋 Thông tin chi tiết</h2>
                            <span className="section-sub">Dữ liệu tài khoản cá nhân</span>
                        </div>

                        <div className="info-grid-list">
                            <div className="info-grid-row">
                                <span className="grid-label">Mã tài khoản</span>
                                <span className="grid-value highlight">#{user.maTaiKhoan}</span>
                            </div>
                            <div className="info-grid-row">
                                <span className="grid-label">Họ và tên</span>
                                <span className="grid-value">{user.hoTen}</span>
                            </div>
                            <div className="info-grid-row">
                                <span className="grid-label">Địa chỉ Email</span>
                                <span className="grid-value">{user.email}</span>
                            </div>
                            <div className="info-grid-row">
                                <span className="grid-label">Vai trò hệ thống</span>
                                <span className="grid-value">{user.vaiTro}</span>
                            </div>
                            <div className="info-grid-row">
                                <span className="grid-label">Số điện thoại</span>
                                <span className="grid-value">{user.soDienThoai || "Chưa cập nhật"}</span>
                            </div>
                            <div className="info-grid-row">
                                <span className="grid-label">Địa chỉ</span>
                                <span className="grid-value">{user.diaChi || "Chưa cập nhật"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bảo mật */}
                    <div className="profile-card">
                        <div className="card-section-header">
                            <h2>🔒 Bảo mật & Xác thực</h2>
                            <span className="section-sub">Quản lý mật khẩu và phiên đăng nhập</span>
                        </div>

                        <div className="security-action-list">
                            <div className="security-action-row">
                                <div className="sec-left">
                                    <div className="sec-icon-box">🔑</div>
                                    <div>
                                        <h4>Mật khẩu đăng nhập</h4>
                                        <p>Đã thiết lập bảo mật mạnh. Khuyên đổi mật khẩu định kỳ.</p>
                                    </div>
                                </div>
                                <button
                                    className="ehc-btn-secondary"
                                    onClick={() => setShowPasswordModal(true)}
                                >
                                    Thay đổi mật khẩu
                                </button>
                            </div>

                            <div className="security-action-row">
                                <div className="sec-left">
                                    <div className="sec-icon-box">🛡️</div>
                                    <div>
                                        <h4>Xác thực 2 bước (2FA)</h4>
                                        <p>Bảo vệ tài khoản qua ứng dụng xác thực hoặc SMS.</p>
                                    </div>
                                </div>
                                <span className="text-status-enabled">Đã bật</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Đổi mật khẩu hiện đại */}
            {showPasswordModal && (
                <div className="ehc-modal-overlay" onClick={() => setShowPasswordModal(false)}>
                    <div className="ehc-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header-box">
                            <h3>Đổi mật khẩu tài khoản</h3>
                            <button className="close-x-btn" onClick={() => setShowPasswordModal(false)}>✕</button>
                        </div>

                        <div className="modal-body-form">
                            <div className="form-group-item">
                                <label>Mật khẩu mới</label>
                                <input
                                    type="password"
                                    placeholder="Ít nhất 6 ký tự bảo mật..."
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>

                            <div className="form-group-item">
                                <label>Xác nhận mật khẩu mới</label>
                                <input
                                    type="password"
                                    placeholder="Nhập lại chính xác mật khẩu..."
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="modal-footer-actions">
                            <button className="ehc-btn-outline" onClick={() => setShowPasswordModal(false)}>
                                Hủy bỏ
                            </button>
                            <button className="ehc-btn-primary" onClick={handlePasswordChange}>
                                Xác nhận thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;