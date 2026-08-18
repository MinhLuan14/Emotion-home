package com.example.demo.dto;

public class LoginResponse {
    private Integer maTaiKhoan;
    private String tenDangNhap;
    private String email;
    private String vaiTro;
    private String trangThai;
    private String message;

    public LoginResponse() {
    }

    public LoginResponse(Integer maTaiKhoan, String tenDangNhap, String email,
            String vaiTro, String trangThai, String message) {
        this.maTaiKhoan = maTaiKhoan;
        this.tenDangNhap = tenDangNhap;
        this.email = email;
        this.vaiTro = vaiTro;
        this.trangThai = trangThai;
        this.message = message;
    }

    public Integer getMaTaiKhoan() {
        return maTaiKhoan;
    }

    public void setMaTaiKhoan(Integer maTaiKhoan) {
        this.maTaiKhoan = maTaiKhoan;
    }

    public String getTenDangNhap() {
        return tenDangNhap;
    }

    public void setTenDangNhap(String tenDangNhap) {
        this.tenDangNhap = tenDangNhap;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getVaiTro() {
        return vaiTro;
    }

    public void setVaiTro(String vaiTro) {
        this.vaiTro = vaiTro;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
