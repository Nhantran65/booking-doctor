-- Create DB
CREATE DATABASE IF NOT EXISTS booking_doctor_db;
USE booking_doctor_dba;

-- Table User: Save User Information
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

-- Table Statuses: Save Status of Appointment (eg: CONFIRMED, DONE, REJECTED, vv)
CREATE TABLE IF NOT EXISTS statuses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table Clinics: Save Clinic Information
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

-- Table Appointments: Save Appointment Information
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


-- Table Stories: Save Story Information
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

-- Table Comments: Save all comments of each story
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



-- Table Specializations: Save Specialization of Doctor
CREATE TABLE IF NOT EXISTS specializations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  doctor_id INT,
  specialization VARCHAR(255),
  description TEXT,
  
  FOREIGN KEY (doctor_id) 
    REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table Notifications: Save Notification Information of each patient or doctor
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  appointment_id INT,
  recipient_id INT,
  recipient_role ENUM('doctor', 'patient'),
  message TEXT,
  created_at DATETIME,
  status_change BOOLEAN DEFAULT FALSE,

  FOREIGN KEY (appointment_id)
    REFERENCES appointments(id)
    ON UPDATE CASCADE ON DELETE CASCADE,

  FOREIGN KEY (recipient_id)
    REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;