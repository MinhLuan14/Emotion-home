package com.example.demo.repository;

import com.example.demo.models.NguoiCaoTuoi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NguoiCaoTuoiRepository extends JpaRepository<NguoiCaoTuoi, Integer> {
    Optional<NguoiCaoTuoi> findByMaNguoiCaoTuoi(Integer maNguoiCaoTuoi);
}
