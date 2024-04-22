USE booking_doctor_db;

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

DELIMITER //

CREATE TRIGGER after_update_appointment_status
AFTER UPDATE ON appointments
FOR EACH ROW
BEGIN
    DECLARE recipient_id INT;
    DECLARE recipient_role ENUM('doctor', 'patient');
    DECLARE message TEXT;

    IF OLD.status_id != NEW.status_id THEN
        IF OLD.status_id IS NULL THEN
            -- Trạng thái cũ là NULL, tức là cuộc hẹn mới được tạo
            -- Gửi thông báo cho bác sĩ
            SET recipient_id = NEW.doctor_id;
            SET recipient_role = 'doctor';
            SET message = CONCAT('Patient ',
                                 (SELECT CONCAT(first_name, ' ', last_name) FROM users WHERE id = NEW.patient_id),
                                 ' has just created an appointment with you.');
        ELSE
            -- Trạng thái cũ không phải là NULL, tức là cuộc hẹn đã tồn tại và có thay đổi trạng thái
            IF NEW.doctor_id IS NOT NULL THEN
                -- Bác sĩ đã thay đổi trạng thái của cuộc hẹn, gửi thông báo cho bệnh nhân
                SET recipient_id = NEW.patient_id;
                SET recipient_role = 'patient';
                SET message = CONCAT('Appointment status is changed to ',
                                     (SELECT name FROM statuses WHERE id = NEW.status_id),
                                     ' by ',
                                     (SELECT CONCAT(first_name, ' ', last_name) FROM users WHERE id = NEW.doctor_id));
            END IF;
        END IF;

        -- Thêm thông báo vào bảng notifications
        INSERT INTO notifications (appointment_id, recipient_id, recipient_role, message, created_at, status_change)
        VALUES (NEW.id, recipient_id, recipient_role, message, NOW(), TRUE);
    END IF;
END;
//

DELIMITER ;