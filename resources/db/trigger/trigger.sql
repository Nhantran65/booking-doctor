USE booking_doctor_dba;

DELIMITER //

CREATE TRIGGER before_insert_users
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF NEW.role IS NULL THEN
        SET NEW.role = 'patient';
    END IF;
END;
//

DELIMITER ;

DELIMITER //

CREATE TRIGGER before_insert_update_appointments
BEFORE INSERT ON appointments
FOR EACH ROW
BEGIN
    DECLARE doctor_role VARCHAR(255);
    DECLARE patient_role VARCHAR(255);

    -- Check doctor_id
    SELECT role INTO doctor_role FROM users WHERE id = NEW.doctor_id;
    IF doctor_role != 'doctor' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot insert appointment for non-doctor user';
    END IF;

    -- Check patient_id
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
    -- Check doctor role for user
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
            -- If old status is NULL, new appointment is created
            -- Send notification to doctor
            SET recipient_id = NEW.doctor_id;
            SET recipient_role = 'doctor';
            SET message = CONCAT('Patient ',
                                 (SELECT CONCAT(first_name, ' ', last_name) FROM users WHERE id = NEW.patient_id),
                                 ' has just created an appointment with you.');
        ELSE
            -- If old status is not NULL, current appointment exists and send notification to patient
            IF NEW.doctor_id IS NOT NULL THEN
                -- Doctor change status then send notification to patient
                SET recipient_id = NEW.patient_id;
                SET recipient_role = 'patient';
                SET message = CONCAT('Appointment status is changed to ',
                                     (SELECT name FROM statuses WHERE id = NEW.status_id),
                                     ' by ',
                                     (SELECT CONCAT(first_name, ' ', last_name) FROM users WHERE id = NEW.doctor_id));
            END IF;
        END IF;

        -- Add new notification into table notifications
        INSERT INTO notifications (appointment_id, recipient_id, recipient_role, message, created_at, status_change)
        VALUES (NEW.id, recipient_id, recipient_role, message, NOW(), TRUE);
    END IF;
END;
//

DELIMITER ;