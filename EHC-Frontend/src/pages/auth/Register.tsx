import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F8FAFC',
        padding: '24px',
        fontFamily: 'Inter, Segoe UI, sans-serif',
    } as const,
    shell: {
        width: '100%',
        maxWidth: '1280px',
        minHeight: '760px',
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '24px',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
        display: 'grid',
        gridTemplateColumns: '0.9fr 1.1fr',
        overflow: 'hidden',
    } as const,
    leftPanel: {
        background: 'linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 100%)',
        padding: '40px 48px',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'space-between',
    } as const,
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 700,
        color: '#0F172A',
        fontSize: '1.05rem',
    } as const,
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontWeight: 800,
        fontSize: '1.5rem',
    } as const,
    logo: {
        width: '36px',
        height: '36px',
        borderRadius: '12px',
        background: '#2563EB',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem',
        boxShadow: '0 8px 20px rgba(37, 99, 235, 0.22)',
    } as const,
    hero: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '18px',
        maxWidth: '420px',
        margin: '0 auto',
        width: '100%',
    } as const,
    heroTitle: {
        fontSize: '2.5rem',
        lineHeight: 1.1,
        fontWeight: 800,
        color: '#0F172A',
        margin: 0,
    } as const,
    heroText: {
        fontSize: '1.02rem',
        color: '#475569',
        lineHeight: 1.7,
        margin: 0,
    } as const,
    card: {
        padding: '48px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
    } as const,
    formWrap: {
        width: '100%',
        maxWidth: '430px',
    } as const,
    formTitle: {
        fontSize: '2.05rem',
        fontWeight: 800,
        color: '#0F172A',
        margin: '0 0 8px',
    } as const,
    subTitle: {
        margin: '0 0 28px',
        color: '#64748B',
        fontSize: '0.97rem',
        lineHeight: 1.6,
    } as const,
    field: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '8px',
        marginBottom: '18px',
    } as const,
    label: {
        fontWeight: 600,
        color: '#334155',
        fontSize: '0.94rem',
    } as const,
    input: {
        width: '100%',
        height: '48px',
        border: '1px solid #CBD5E1',
        borderRadius: '12px',
        padding: '0 14px',
        fontSize: '0.98rem',
        color: '#0F172A',
        background: '#fff',
        outline: 'none',
        boxSizing: 'border-box' as const,
    } as const,
    button: {
        width: '100%',
        height: '48px',
        borderRadius: '12px',
        border: 'none',
        background: '#2563EB',
        color: '#fff',
        fontWeight: 700,
        fontSize: '0.98rem',
        cursor: 'pointer',
        boxShadow: '0 10px 20px rgba(37, 99, 235, 0.18)',
        marginTop: '8px',
    } as const,
    linkText: {
        color: '#2563EB',
        textDecoration: 'none',
        fontWeight: 600,
        cursor: 'pointer',
    } as const,
    smallText: {
        textAlign: 'center' as const,
        color: '#64748B',
        marginTop: '18px',
        fontSize: '0.95rem',
    } as const,
} as const;

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert('Mật khẩu xác nhận không khớp');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tenDangNhap: form.username,
                    email: form.email,
                    matKhau: form.password,
                })
            });

            if (!response.ok) {
                throw new Error('Đăng ký thất bại');
            }

            const result = await response.json();
            console.log('Register success:', result);
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert('Đăng ký không thành công, vui lòng thử lại');
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.shell}>
                <div style={styles.leftPanel}>
                    <div style={styles.topBar}>
                        <div style={styles.brand}>
                            <span style={styles.logo}>🏠</span>
                            <span>EHC</span>
                        </div>
                        <Link to="/login" style={{ ...styles.linkText, textDecoration: 'none' }}>Đăng nhập</Link>
                    </div>

                    <div style={styles.hero}>
                        <h1 style={styles.heroTitle}>Tạo tài khoản</h1>
                        <p style={styles.heroText}>Đăng ký để đồng hành cùng gia đình và quản lý sức khỏe người cao tuổi hiệu quả hơn.</p>
                    </div>

                    <div />
                </div>

                <div style={styles.card}>
                    <div style={styles.formWrap}>
                        <h2 style={styles.formTitle}>Đăng ký</h2>
                        <p style={styles.subTitle}>Tạo tài khoản mới để bắt đầu trải nghiệm EHC.</p>

                        <form onSubmit={handleSubmit}>
                            <div style={styles.field}>
                                <label style={styles.label}>Tên đăng nhập</label>
                                <input
                                    name="username"
                                    type="text"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="Nhập tên đăng nhập"
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Nhập email"
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Mật khẩu</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Nhập mật khẩu"
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Xác nhận mật khẩu</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Nhập lại mật khẩu"
                                    style={styles.input}
                                />
                            </div>

                            <button type="submit" style={styles.button}>ĐĂNG KÝ</button>

                            <p style={styles.smallText}>
                                Đã có tài khoản?{' '}
                                <Link to="/login" style={styles.linkText}>Đăng nhập</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
