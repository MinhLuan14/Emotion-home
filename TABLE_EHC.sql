/* ============================================================
   EHC SYSTEM DATABASE
   SQL SERVER
   Phiên bản: MVP + có khả năng mở rộng AI
   ============================================================ */

-- ============================================================
-- 0. TẠO DATABASE
-- ============================================================

IF NOT EXISTS (
    SELECT *
    FROM sys.databases
    WHERE name = N'EHC_SystemDB'
)
BEGIN
    CREATE DATABASE EHC_SystemDB;
END
GO

USE EHC_SystemDB;
GO


/* ============================================================
   1. XÓA BẢNG CŨ
   Xóa theo thứ tự bảng con -> bảng cha
   ============================================================ */

IF OBJECT_ID('ThuocNguoiCaoTuoi', 'U') IS NOT NULL
    DROP TABLE ThuocNguoiCaoTuoi;

IF OBJECT_ID('DiUngNguoiCaoTuoi', 'U') IS NOT NULL
    DROP TABLE DiUngNguoiCaoTuoi;

IF OBJECT_ID('BenhNguoiCaoTuoi', 'U') IS NOT NULL
    DROP TABLE BenhNguoiCaoTuoi;

IF OBJECT_ID('Benh', 'U') IS NOT NULL
    DROP TABLE Benh;

IF OBJECT_ID('HoSoSucKhoe', 'U') IS NOT NULL
    DROP TABLE HoSoSucKhoe;

IF OBJECT_ID('QuanHeNguoiThan', 'U') IS NOT NULL
    DROP TABLE QuanHeNguoiThan;

IF OBJECT_ID('NguoiThan', 'U') IS NOT NULL
    DROP TABLE NguoiThan;

IF OBJECT_ID('NguoiCaoTuoi', 'U') IS NOT NULL
    DROP TABLE NguoiCaoTuoi;

IF OBJECT_ID('TaiKhoan', 'U') IS NOT NULL
    DROP TABLE TaiKhoan;
GO


/* ============================================================
   2. TÀI KHOẢN
   Dùng cho đăng nhập hệ thống
   ============================================================ */

CREATE TABLE TaiKhoan (
    maTaiKhoan INT IDENTITY(1,1) PRIMARY KEY,

    tenDangNhap VARCHAR(100) NOT NULL UNIQUE,

    email VARCHAR(150) NOT NULL UNIQUE,

    matKhauMaHoa VARCHAR(255) NOT NULL,

    vaiTro NVARCHAR(30) NOT NULL
        DEFAULT N'Người thân',

    trangThai NVARCHAR(50) NOT NULL
        DEFAULT N'Hoạt động',

    lanDangNhapCuoi DATETIME2 NULL,

    ngayTao DATETIME2 NOT NULL
        DEFAULT GETDATE(),

    ngayCapNhat DATETIME2 NOT NULL
        DEFAULT GETDATE(),

    CONSTRAINT CK_TaiKhoan_VaiTro
        CHECK (
            vaiTro IN (
                N'Người thân',
                N'Quản trị viên'
            )
        ),

    CONSTRAINT CK_TaiKhoan_TrangThai
        CHECK (
            trangThai IN (
                N'Hoạt động',
                N'Đã khóa',
                N'Chờ xác thực'
            )
        )
);
GO


/* ============================================================
   3. NGƯỜI CAO TUỔI
   Đối tượng trung tâm của hệ thống
   ============================================================ */

CREATE TABLE NguoiCaoTuoi (
    maNguoiCaoTuoi INT IDENTITY(1,1) PRIMARY KEY,

    hoTen NVARCHAR(100) NOT NULL,

    ngaySinh DATE NULL,

    gioiTinh NVARCHAR(10) NULL,

    soDienThoai VARCHAR(20) NULL,

    diaChi NVARCHAR(255) NULL,

    anhDaiDien VARCHAR(500) NULL,

    songMotMinh BIT NOT NULL
        DEFAULT 1,

    trangThai NVARCHAR(50) NOT NULL
        DEFAULT N'Đang theo dõi',

    ngayTao DATETIME2 NOT NULL
        DEFAULT GETDATE(),

    ngayCapNhat DATETIME2 NOT NULL
        DEFAULT GETDATE(),

    CONSTRAINT CK_NguoiCaoTuoi_GioiTinh
        CHECK (
            gioiTinh IS NULL
            OR gioiTinh IN (
                N'Nam',
                N'Nữ',
                N'Khác'
            )
        ),

    CONSTRAINT CK_NguoiCaoTuoi_TrangThai
        CHECK (
            trangThai IN (
                N'Đang theo dõi',
                N'Ngừng theo dõi'
            )
        )
);
GO


/* ============================================================
   4. NGƯỜI THÂN
   Hồ sơ cá nhân của con/cháu/người chăm sóc
   ============================================================ */

CREATE TABLE NguoiThan (
    maNguoiThan INT IDENTITY(1,1) PRIMARY KEY,

    maTaiKhoan INT NOT NULL UNIQUE,

    hoTen NVARCHAR(100) NOT NULL,

    soDienThoai VARCHAR(20) NULL,

    anhDaiDien VARCHAR(500) NULL,

    trangThai NVARCHAR(50) NOT NULL
        DEFAULT N'Hoạt động',

    ngayTao DATETIME2 NOT NULL
        DEFAULT GETDATE(),

    ngayCapNhat DATETIME2 NOT NULL
        DEFAULT GETDATE(),

    CONSTRAINT FK_NguoiThan_TaiKhoan
        FOREIGN KEY (maTaiKhoan)
        REFERENCES TaiKhoan(maTaiKhoan)
        ON DELETE CASCADE,

    CONSTRAINT CK_NguoiThan_TrangThai
        CHECK (
            trangThai IN (
                N'Hoạt động',
                N'Ngừng hoạt động'
            )
        )
);
GO


/* ============================================================
   5. QUAN HỆ NGƯỜI THÂN - NGƯỜI CAO TUỔI
   Xác định ai được quyền theo dõi ai
   ============================================================ */

CREATE TABLE QuanHeNguoiThan (
    maNguoiCaoTuoi INT NOT NULL,

    maNguoiThan INT NOT NULL,

    moiQuanHe NVARCHAR(50) NOT NULL,

    laNguoiTheoDoiChinh BIT NOT NULL
        DEFAULT 0,

    duocNhanCanhBao BIT NOT NULL
        DEFAULT 1,

    duocXemDashboard BIT NOT NULL
        DEFAULT 1,

    ngayTao DATETIME2 NOT NULL
        DEFAULT GETDATE(),

    PRIMARY KEY (
        maNguoiCaoTuoi,
        maNguoiThan
    ),

    CONSTRAINT FK_QHNCT_NguoiCaoTuoi
        FOREIGN KEY (maNguoiCaoTuoi)
        REFERENCES NguoiCaoTuoi(maNguoiCaoTuoi)
        ON DELETE CASCADE,

    CONSTRAINT FK_QHNCT_NguoiThan
        FOREIGN KEY (maNguoiThan)
        REFERENCES NguoiThan(maNguoiThan)
        ON DELETE CASCADE
);
GO


/* ============================================================
   CHỈ CHO PHÉP 1 NGƯỜI THEO DÕI CHÍNH
   trên mỗi người cao tuổi
   ============================================================ */

CREATE UNIQUE INDEX UX_QuanHeNguoiThan_NguoiTheoDoiChinh
ON QuanHeNguoiThan(maNguoiCaoTuoi)
WHERE laNguoiTheoDoiChinh = 1;
GO


/* ============================================================
   6. HỒ SƠ SỨC KHỎE
   Hồ sơ tổng quát của người cao tuổi
   ============================================================ */
CREATE TABLE HoSoSucKhoe (
    maHoSoSucKhoe INT IDENTITY(1,1) PRIMARY KEY,
    maNguoiCaoTuoi INT NOT NULL UNIQUE,
    nhomMau VARCHAR(10) NULL,
    chieuCao DECIMAL(5,2) NULL,
    canNang DECIMAL(5,2) NULL,
    luuYChamSoc NVARCHAR(MAX) NULL,
    ghiChu NVARCHAR(MAX) NULL,
    ngayTao DATETIME2 NOT NULL
        DEFAULT GETDATE(),
    ngayCapNhat DATETIME2 NOT NULL
        DEFAULT GETDATE(),
    CONSTRAINT FK_HoSoSucKhoe_NguoiCaoTuoi
        FOREIGN KEY (maNguoiCaoTuoi)
        REFERENCES NguoiCaoTuoi(maNguoiCaoTuoi)
        ON DELETE CASCADE,

    CONSTRAINT CK_HoSoSucKhoe_NhomMau
        CHECK (
            nhomMau IS NULL
            OR nhomMau IN (
                'A',
                'B',
                'AB',
                'O'
            )
        ),

    CONSTRAINT CK_HoSoSucKhoe_ChieuCao
        CHECK (
            chieuCao IS NULL
            OR chieuCao > 0
        ),

    CONSTRAINT CK_HoSoSucKhoe_CanNang
        CHECK (
            canNang IS NULL
            OR canNang > 0
        )
);
GO
/* ============================================================
   7. DANH MỤC BỆNH
   Đây là bảng kiến thức chuẩn về các bệnh.
   
   Có thể bổ sung bệnh mới mà không cần sửa cấu trúc DB.
   ============================================================ */
CREATE TABLE Benh (
    maBenh INT IDENTITY(1,1) PRIMARY KEY,
    tenBenh NVARCHAR(200) NOT NULL,
    tenBenhKhac NVARCHAR(500) NULL,
    maICD10 VARCHAR(20) NULL,
    nhomBenh NVARCHAR(100) NULL,
    moTa NVARCHAR(MAX) NULL,
    mucDoPhoBien NVARCHAR(30) NULL,
    trangThai BIT NOT NULL
        DEFAULT 1,
    ngayTao DATETIME2 NOT NULL
        DEFAULT GETDATE(),
    ngayCapNhat DATETIME2 NOT NULL
        DEFAULT GETDATE(),
    CONSTRAINT UQ_Benh_TenBenh
        UNIQUE (tenBenh),
    CONSTRAINT CK_Benh_MucDoPhoBien
        CHECK (
            mucDoPhoBien IS NULL
            OR mucDoPhoBien IN (
                N'Thấp',
                N'Trung bình',
                N'Cao'
            )
        )
);
GO
/* ============================================================
   8. BỆNH CỦA NGƯỜI CAO TUỔI
   Quan hệ N-N:
   
   Một người có thể có nhiều bệnh
   Một bệnh có thể xuất hiện ở nhiều người
   ============================================================ */
CREATE TABLE BenhNguoiCaoTuoi (
    maNguoiCaoTuoi INT NOT NULL,
    maBenh INT NOT NULL,
    loaiBenh NVARCHAR(50) NOT NULL,
    ngayPhatHien DATE NULL,
    trangThai NVARCHAR(50) NOT NULL
        DEFAULT N'Đang theo dõi',
    mucDo NVARCHAR(30) NULL,
    ghiChu NVARCHAR(MAX) NULL,
    ngayTao DATETIME2 NOT NULL
        DEFAULT GETDATE(),
    ngayCapNhat DATETIME2 NOT NULL
        DEFAULT GETDATE(),
    PRIMARY KEY (
        maNguoiCaoTuoi,
        maBenh
    ),
    CONSTRAINT FK_BenhNCT_NguoiCaoTuoi
        FOREIGN KEY (maNguoiCaoTuoi)
        REFERENCES NguoiCaoTuoi(maNguoiCaoTuoi)
        ON DELETE CASCADE,
    CONSTRAINT FK_BenhNCT_Benh
        FOREIGN KEY (maBenh)
        REFERENCES Benh(maBenh)
        ON DELETE CASCADE,
    CONSTRAINT CK_BenhNCT_LoaiBenh
        CHECK (
            loaiBenh IN (
                N'Bệnh nền',
                N'Tiền sử bệnh',
                N'Bệnh đang điều trị',
                N'Bệnh đã khỏi'
            )
        ),
    CONSTRAINT CK_BenhNCT_TrangThai
        CHECK (
            trangThai IN (
                N'Đang theo dõi',
                N'Ổn định',
                N'Đã khỏi',
                N'Không còn theo dõi'
            )
        ),
    CONSTRAINT CK_BenhNCT_MucDo
        CHECK (
            mucDo IS NULL
            OR mucDo IN (
                N'Nhẹ',
                N'Trung bình',
                N'Nặng'
            )
        )
);
GO
/* ============================================================
   9. DỊ ỨNG
   Tách riêng để AI có thể sử dụng như một điều kiện an toàn
   ============================================================ */
CREATE TABLE DiUngNguoiCaoTuoi (
    maDiUng INT IDENTITY(1,1) PRIMARY KEY,
    maNguoiCaoTuoi INT NOT NULL,
    chatGayDiUng NVARCHAR(200) NOT NULL,
    mucDo NVARCHAR(30) NULL,
    phanUng NVARCHAR(MAX) NULL,
    ghiChu NVARCHAR(MAX) NULL,
    ngayTao DATETIME2 NOT NULL
        DEFAULT GETDATE(),
    CONSTRAINT FK_DiUng_NguoiCaoTuoi
        FOREIGN KEY (maNguoiCaoTuoi)
        REFERENCES NguoiCaoTuoi(maNguoiCaoTuoi)
        ON DELETE CASCADE,
    CONSTRAINT CK_DiUng_MucDo
        CHECK (
            mucDo IS NULL
            OR mucDo IN (
                N'Nhẹ',
                N'Trung bình',
                N'Nặng',
                N'Nguy hiểm'
            )
        )
);
GO
/* ============================================================
   10. THUỐC
   Thông tin thuốc người cao tuổi đang sử dụng
   ============================================================ */
CREATE TABLE ThuocNguoiCaoTuoi (
    maThuoc INT IDENTITY(1,1) PRIMARY KEY,

    maNguoiCaoTuoi INT NOT NULL,

    tenThuoc NVARCHAR(200) NOT NULL,

    lieuDung NVARCHAR(100) NULL,
    -- Ví dụ: 1 viên, 2 viên, 5ml

    mucDichSuDung NVARCHAR(500) NULL,
    -- Ví dụ: Điều trị huyết áp

    dangSuDung BIT NOT NULL DEFAULT 1,

    ghiChu NVARCHAR(MAX) NULL,

    ngayBatDau DATE NULL,
    ngayKetThuc DATE NULL,

    ngayTao DATETIME2 NOT NULL DEFAULT GETDATE(),
    ngayCapNhat DATETIME2 NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Thuoc_NguoiCaoTuoi
        FOREIGN KEY (maNguoiCaoTuoi)
        REFERENCES NguoiCaoTuoi(maNguoiCaoTuoi)
        ON DELETE CASCADE
);
GO
CREATE TABLE HoSoNhanDien (
    maHoSoNhanDien INT IDENTITY(1,1) PRIMARY KEY,
    maNguoiCaoTuoi INT NOT NULL,
    maNhanDien VARCHAR(100) NOT NULL,
    loaiNhanDien NVARCHAR(30) NOT NULL
        DEFAULT N'Khuôn mặt',
    trangThai BIT NOT NULL
        DEFAULT 1,
    ngayTao DATETIME2 NOT NULL
        DEFAULT GETDATE(),
    ngayCapNhat DATETIME2 NOT NULL
        DEFAULT GETDATE(),
    CONSTRAINT FK_HoSoNhanDien_NguoiCaoTuoi
        FOREIGN KEY (maNguoiCaoTuoi)
        REFERENCES NguoiCaoTuoi(maNguoiCaoTuoi)
        ON DELETE CASCADE
);

select * from TaiKhoan