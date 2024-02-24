-- Create DB
CREATE DATABASE IF NOT EXISTS booking_doctor_db;
USE booking_doctor_db;

-- Bảng Users: Lưu thông tin người dùng
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role ENUM('doctor', 'patient', 'admin'),
  profile_picture TEXT,
  bio TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bảng Statuses: Lưu trạng thái của cuộc hẹn (ví dụ: đã xác nhận, đã hoàn thành, hủy bỏ, vv)
CREATE TABLE IF NOT EXISTS statuses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bảng Clinics: Lưu thông tin về các phòng khám
CREATE TABLE IF NOT EXISTS clinics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  established DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bảng Appointments: Lưu thông tin về cuộc hẹn giữa bác sĩ và bệnh nhân
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  doctor_id INT,
  patient_id INT,
  clinic_id INT,
  status_id INT,
  appointment_date DATETIME,
  note TEXT,
  
  FOREIGN KEY (doctor_id) 
  REFERENCES users(id)
  ON UPDATE CASCADE ON DELETE CASCADE,
  
  FOREIGN KEY (patient_id) 
  REFERENCES users(id)
  ON UPDATE CASCADE ON DELETE CASCADE,
  
  FOREIGN KEY (clinic_id) 
  REFERENCES clinics(id)
  ON UPDATE CASCADE ON DELETE CASCADE,
  
  FOREIGN KEY (status_id) 
  REFERENCES statuses(id)
  ON UPDATE CASCADE ON DELETE CASCADE
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELIMITER //

CREATE TRIGGER before_insert_update_appointments
BEFORE INSERT ON appointments
FOR EACH ROW
BEGIN
    DECLARE doctor_role VARCHAR(255);
    DECLARE patient_role VARCHAR(255);

    -- Kiểm tra doctor_id
    SELECT role INTO doctor_role FROM users WHERE id = NEW.doctor_id;
    IF doctor_role != 'doctor' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot insert appointment for non-doctor user';
    END IF;

    -- Kiểm tra patient_id
    SELECT role INTO patient_role FROM users WHERE id = NEW.patient_id;
    IF patient_role != 'patient' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot insert appointment for non-patient user';
    END IF;
END;
//

DELIMITER ;


-- Bảng Stories: Lưu các câu chuyện của người dùng về trải nghiệm khám bệnh
CREATE TABLE IF NOT EXISTS stories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  content TEXT,
  image_url TEXT, 
  created_at DATETIME,
  
  FOREIGN KEY (user_id) 
  REFERENCES users(id)
  ON UPDATE CASCADE ON DELETE CASCADE
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bảng Comments: Lưu các nhận xét của người dùng về câu chuyện
CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  story_id INT,
  comment TEXT,
  image_url TEXT, 
  rating FLOAT,
  created_at DATETIME,
  
  FOREIGN KEY (user_id) 
  REFERENCES users(id)
  ON UPDATE CASCADE ON DELETE CASCADE,
  
  FOREIGN KEY (story_id) 
  REFERENCES stories(id)
  ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- Bảng Specializations: Lưu thông tin về các chuyên ngành của bác sĩ
CREATE TABLE IF NOT EXISTS specializations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  doctor_id INT,
  specialization VARCHAR(255),
  description TEXT,
  
  FOREIGN KEY (doctor_id) 
    REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELIMITER //

CREATE TRIGGER before_insert_update_specializations
BEFORE INSERT ON specializations
FOR EACH ROW
BEGIN
    DECLARE user_role VARCHAR(255);

    SELECT role INTO user_role FROM users WHERE id = NEW.doctor_id;

    IF user_role != 'doctor' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot insert specialization for non-doctor user';
    END IF;
END;
//

DELIMITER ;
