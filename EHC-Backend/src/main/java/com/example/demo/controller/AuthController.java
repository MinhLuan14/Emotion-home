package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.example.demo.service.AuthService;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String DangKyTaiKhoan(@RequestBody RegisterRequest request) {
        // TODO: process POST request
        authService.DangKyTaiKhoan(request);
        return "Đăng ký thành công";
    }

    @PostMapping("/dang-nhap")
    public ResponseEntity<?> DangNhap(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.DangNhapService(request));
    }

}
