package com.example.demo.controller;

import com.example.demo.dto.UpdateProfileRequest;
import com.example.demo.dto.UserProfileResponse;
import com.example.demo.service.ProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/{maTaiKhoan}")
    public ResponseEntity<UserProfileResponse> getProfile(
            @PathVariable Integer maTaiKhoan) {

        return ResponseEntity.ok(
                profileService.getProfile(maTaiKhoan));
    }

    @GetMapping("/{maTaiKhoan}/nguoiCaoTuoi/{maNguoiCaoTuoi}")
    public ResponseEntity<UserProfileResponse> getProfileByMaNguoiCaoTuoi(
            @PathVariable Integer maTaiKhoan,
            @PathVariable Integer maNguoiCaoTuoi) {

        return ResponseEntity.ok(
                profileService.getProfileByMaNguoiCaoTuoi(maTaiKhoan, maNguoiCaoTuoi));
    }

    @PutMapping("/{maTaiKhoan}")
    public ResponseEntity<UserProfileResponse> updateProfile(
            @PathVariable Integer maTaiKhoan,
            @RequestBody UpdateProfileRequest request) {

        return ResponseEntity.ok(
                profileService.updateProfile(maTaiKhoan, request));
    }
}