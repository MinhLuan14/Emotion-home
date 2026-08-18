import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/CSS/MainLayout.css";
import logoEHC from "../assets/LOGOEHC.png";

type Props = {
    children?: React.ReactNode;
};

type User = {
    maTaiKhoan: number;
    tenDangNhap: string;
    email: string;
    vaiTro: string;
    trangThai: string;
    message?: string;
};

const MainLayout: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();

    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            return null;
        }

        try {
            return JSON.parse(savedUser);
        } catch {
            localStorage.removeItem("user");
            return null;
        }
    });

    const handleSidebarToggle = () => {
        if (window.innerWidth <= 768) {
            setIsMobileOpen((prev) => !prev);
        } else {
            setIsCollapsed((prev) => !prev);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsMobileOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow =
            isMobileOpen && window.innerWidth <= 768
                ? "hidden"
                : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileOpen]);

    // Đồng bộ user khi localStorage thay đổi
    useEffect(() => {
        const handleStorageChange = () => {
            const savedUser = localStorage.getItem("user");

            if (savedUser) {
                try {
                    setUser(JSON.parse(savedUser));
                } catch {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const menuItems = [
        { path: "/", label: "Tổng quan", icon: "🏠", end: true },
        { path: "/camera", label: "Camera Realtime", icon: "📷" },
        { path: "/emotion", label: "Cảm xúc", icon: "😊" },
        { path: "/activity", label: "Hoạt động", icon: "🏃‍♂️" },
        { path: "/alerts", label: "Cảnh báo", icon: "⚠️" },
        { path: "/chat", label: "Trò chuyện", icon: "💬" },
        { path: "/history", label: "Lịch sử", icon: "📊" },
        { path: "/happiness", label: "Điểm hạnh phúc", icon: "⭐" },
        { path: "/devices", label: "Thiết bị", icon: "💻" },
        { path: "/profile", label: "Hồ sơ", icon: "👤" },
        { path: "/settings", label: "Cài đặt", icon: "⚙️" },
        { path: "/privacy", label: "Bảo mật", icon: "🛡️" },
    ];

    return (
        <div className="ehc-layout">

            {isMobileOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsMobileOpen(false)}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`ehc-sidebar ${isCollapsed ? "collapsed" : ""
                    } ${isMobileOpen ? "open" : ""}`}
                aria-label="Navigation"
            >

                <div className="ehc-sidebar-top">

                    <div className="ehc-logo-container">
                        <img
                            src={logoEHC}
                            alt="EHC Smart Companion"
                            className="ehc-logo-image"
                        />

                        <button
                            type="button"
                            className="sidebar-close-btn"
                            onClick={() => setIsMobileOpen(false)}
                            aria-label="Đóng menu"
                        >
                            ×
                        </button>
                    </div>

                    <nav className="ehc-nav" aria-label="Primary">
                        <ul>
                            {menuItems.map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        end={item.end}
                                        onClick={() =>
                                            window.innerWidth <= 768 &&
                                            setIsMobileOpen(false)
                                        }
                                        className={({ isActive }) =>
                                            isActive
                                                ? "nav-link active"
                                                : "nav-link"
                                        }
                                    >
                                        <span className="nav-icon">
                                            {item.icon}
                                        </span>

                                        <span className="nav-text">
                                            {item.label}
                                        </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="ehc-sidebar-bottom">

                    <button
                        type="button"
                        className="sos-button"
                        aria-label="Emergency SOS"
                        onClick={() =>
                            alert("Kích hoạt tín hiệu khẩn cấp!")
                        }
                    >
                        <span className="sos-icon">🚨</span>
                        <span className="sos-text">
                            EMERGENCY SOS
                        </span>
                    </button>

                    <div className="version-info">
                        <span>EHC System</span>
                        <span className="version-badge">
                            v1.0
                        </span>
                    </div>

                </div>
            </aside>

            <main className="ehc-main">

                <header className="ehc-topbar">

                    <div className="topbar-left">

                        <button
                            type="button"
                            className="menu-toggle-btn"
                            onClick={handleSidebarToggle}
                            aria-label="Menu"
                        >
                            ☰
                        </button>

                        <div className="user-status-banner">

                            <span className="status-dot" />

                            <span className="patient-name">
                                {user?.tenDangNhap || "Khách"}
                            </span>

                            <span className="badge-zerocloud">
                                🔒 Zero-Cloud
                            </span>

                        </div>
                    </div>

                    <div className="topbar-right">

                        <button
                            type="button"
                            className="top-action-btn"
                            title="Thông báo"
                            aria-label="Thông báo"
                        >
                            🔔
                            <span className="notification-badge">
                                2
                            </span>
                        </button>

                        <button
                            type="button"
                            className="topbar-avatar"
                            title={user?.email || "Hồ sơ"}
                            aria-label="Hồ sơ"
                            onClick={() => navigate("/profile")}
                        >
                            👤
                        </button>

                        <button
                            type="button"
                            onClick={handleLogout}
                            style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                color: "#64748B",
                                fontWeight: 600,
                            }}
                        >
                            Đăng xuất
                        </button>

                    </div>

                </header>

                <section className="ehc-content" role="main">
                    {children}
                </section>

            </main>
        </div>
    );
};

export default MainLayout;