package com.example.demo.repository;

import com.example.demo.models.NguoiThan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NguoiThanRepository extends JpaRepository<NguoiThan, Integer> {
    Optional<NguoiThan> findByMaNguoiThan(Integer maNguoiThan);
    
    Optional<NguoiThan> findByTaiKhoanMaTaiKhoan(Integer maTaiKhoan);
}
