package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.dto.RegisterRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.models.*;
import com.example.demo.repository.TaiKhoanRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AuthService {
    @Autowired
    private TaiKhoanRepository taiKhoanRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    // đăng ký tài khoản
    public void DangKyTaiKhoan(RegisterRequest request) {
        // Kiểm tra Tồn tại hay ko
        boolean TonTaiTenDN = KiemTraTenDangNhap(request.getTenDangNhap());
        boolean TonTaiEmail = KiemTraEmail(request.getEmail());

        if (TonTaiTenDN == true) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Tên đăng nhập đã tồn tại");
        }
        if (TonTaiEmail == true) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email đã tồn tại");
        }
        // hasd mat khau
        if (TonTaiTenDN == false && TonTaiEmail == false) {
            String matKhauDaHash = matKhauDaHash(request.getMatKhau());
            TaiKhoan taiKhoan = new TaiKhoan();
            taiKhoan.setTenDangNhap(request.getTenDangNhap());
            taiKhoan.setEmail(request.getEmail());
            taiKhoan.setMatKhauMaHoa(matKhauDaHash);
            taiKhoanRepository.save(taiKhoan);
        }

    }

    // kiem tra
    public boolean KiemTraTenDangNhap(String tenDangNhap) {

        // kkieemr tra ten dang nhap
        if (taiKhoanRepository.findByTenDangNhap(tenDangNhap).isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    // Kiem tra Email
    public boolean KiemTraEmail(String email) {
        if (taiKhoanRepository.findByEmail(email).isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    // hàm hash MatKhau
    public String matKhauDaHash(String matKhau) {
        return passwordEncoder.encode(matKhau);
    }

    // Đăng nhập

    public LoginResponse DangNhapService(LoginRequest request) {
        TaiKhoan tk = taiKhoanRepository
                .findByTenDangNhap(request.getTenDangNhap())
                .orElseThrow(() -> new RuntimeException("Tên đăng nhập không tồn tại"));
        if (!passwordEncoder.matches(
                request.getMatKhau(),
                tk.getMatKhauMaHoa())) {

            throw new RuntimeException("Mật khẩu không chính xác");
        }
        if (!"Hoạt động".equals(tk.getTrangThai())) {
            throw new RuntimeException("Tài khoản đã bị khóa");
        }
        return new LoginResponse(
                tk.getMaTaiKhoan(),
                tk.getTenDangNhap(),
                tk.getEmail(),
                tk.getVaiTro(),
                tk.getTrangThai(),
                "Đăng nhập thành công");
    }
}
