package com.example.demo.service;

import com.example.demo.dto.UpdateProfileRequest;
import com.example.demo.dto.UserProfileResponse;

public class ProfileService {

    public UserProfileResponse getProfile(Integer maTaiKhoan) {

        UserProfileResponse response = new UserProfileResponse();
        response.getHoTen();
        response.getGioiTinh();
        response.getEmail();
        response.getDiaChi();
        

        return response;
    }

    public UserProfileResponse updateProfile(
            Integer maTaiKhoan,
            UpdateProfileRequest request) {

        UserProfileResponse response = new UserProfileResponse();

        // xử lý cập nhật ở đây

        return response;
    }
}