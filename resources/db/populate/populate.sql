USE booking_doctor_dba;

-- Inserting into Users table
INSERT INTO users (first_name, last_name, email, password_hash, role, profile_picture, bio)
VALUES
('John', 'Doe', 'john@example.com', 'password_hash_1', 'patient', 'profile1.jpg', 'Bio for John Doe'),
('Jane', 'Smith', 'jane@example.com', 'password_hash_2', 'doctor', 'profile2.jpg', 'Bio for Jane Smith'),
('Alice', 'Johnson', 'alice@example.com', 'password_hash_3', 'patient', 'profile3.jpg', 'Bio for Alice Johnson'),
('Bob', 'Brown', 'bob@example.com', 'password_hash_4', 'doctor', 'profile4.jpg', 'Bio for Bob Brown'),
('Emily', 'Davis', 'emily@example.com', 'password_hash_5', 'patient', 'profile5.jpg', 'Bio for Emily Davis'),
('Michael', 'Wilson', 'michael@example.com', 'password_hash_6', 'doctor', 'profile6.jpg', 'Bio for Michael Wilson'),
('Samantha', 'Martinez', 'samantha@example.com', 'password_hash_7', 'patient', 'profile7.jpg', 'Bio for Samantha Martinez'),
('David', 'Anderson', 'david@example.com', 'password_hash_8', 'doctor', 'profile8.jpg', 'Bio for David Anderson'),
('Emma', 'Taylor', 'emma@example.com', 'password_hash_9', 'patient', 'profile9.jpg', 'Bio for Emma Taylor'),
('Christopher', 'Thomas', 'chris@example.com', 'password_hash_10', 'doctor', 'profile10.jpg', 'Bio for Christopher Thomas');

-- Inserting into Statuses table
INSERT INTO statuses (name)
VALUES
('NEW'),
('PENDING'),
('DONE'),
('CONFIRMED'),
('REJECTED'),
('FAILED');

-- Inserting into Clinics table
INSERT INTO clinics (name, description, address, phone, email, website, established)
VALUES
('ABC Clinic', 'Description for ABC Clinic', '123 Main St, City, Country', '123-456-7890', 'info@abcclinic.com', 'www.abcclinic.com', '2000-01-01'),
('XYZ Clinic', 'Description for XYZ Clinic', '456 Oak St, City, Country', '987-654-3210', 'info@xyzclinic.com', 'www.xyzclinic.com', '1995-06-15'),
('City Hospital', 'Description for City Hospital', '789 Elm St, City, Country', '555-123-4567', 'info@cityhospital.com', 'www.cityhospital.com', '1980-10-20'),
('Sunrise Medical Center', 'Description for Sunrise Medical Center', '101 Pine St, City, Country', '111-222-3333', 'info@sunrisemedical.com', 'www.sunrisemedical.com', '1975-03-12'),
('Green Hills Clinic', 'Description for Green Hills Clinic', '321 Maple St, City, Country', '777-888-9999', 'info@greenhillsclinic.com', 'www.greenhillsclinic.com', '2010-12-05'),
('Lakeview Hospital', 'Description for Lakeview Hospital', '555 Cedar St, City, Country', '222-333-4444', 'info@lakeviewhospital.com', 'www.lakeviewhospital.com', '1998-08-28'),
('Valley Medical Center', 'Description for Valley Medical Center', '777 Walnut St, City, Country', '444-555-6666', 'info@valleymedicalcenter.com', 'www.valleymedicalcenter.com', '2005-05-02'),
('Mountain View Clinic', 'Description for Mountain View Clinic', '888 Oak St, City, Country', '666-777-8888', 'info@mountainviewclinic.com', 'www.mountainviewclinic.com', '2015-11-17'),
('Downtown Health Center', 'Description for Downtown Health Center', '999 Elm St, City, Country', '333-444-5555', 'info@downtownhealthcenter.com', 'www.downtownhealthcenter.com', '2008-07-09'),
('Riverside Medical Clinic', 'Description for Riverside Medical Clinic', '222 Pine St, City, Country', '888-999-0000', 'info@riversidemedicalclinic.com', 'www.riversidemedicalclinic.com', '2003-04-23');

-- Inserting into Appointments table
INSERT INTO appointments (doctor_id, patient_id, clinic_id, status_id, appointment_date, note)
VALUES
(2, 1, 1, 2, '2024-02-25 10:00:00', 'Note for appointment 1'),
(4, 3, 3,3, '2024-03-01 14:30:00', 'Note for appointment 2'),
(6, 5, 5,4,  '2024-03-05 09:15:00', 'Note for appointment 3'),
(8, 7, 7,1,  '2024-03-10 11:45:00', 'Note for appointment 4'),
(10, 9, 9,4,  '2024-03-15 13:00:00', 'Note for appointment 5'),
(2, 7, 2, 5,  '2024-03-20 16:20:00', 'Note for appointment 6'),
(4, 5, 4, 6, '2024-03-25 08:30:00', 'Note for appointment 7'),
(6, 3, 6, 1,  '2024-03-30 12:00:00', 'Note for appointment 8'),
(8, 1, 8, 2,  '2024-04-05 15:45:00', 'Note for appointment 9'),
(10, 7, 10, 4,  '2024-04-10 17:10:00', 'Note for appointment 10');

-- Inserting into Stories table
INSERT INTO stories (user_id, title, content, image_url, created_at)
VALUES
(1, 'Story Title 1', 'Story content for user 1', 'image1.jpg', '2024-02-20 09:30:00'),
(3, 'Story Title 2', 'Story content for user 3', 'image2.jpg', '2024-02-21 10:45:00'),
(5, 'Story Title 3', 'Story content for user 5', 'image3.jpg', '2024-02-22 11:20:00'),
(7, 'Story Title 4', 'Story content for user 7', 'image4.jpg', '2024-02-23 12:55:00'),
(9, 'Story Title 5', 'Story content for user 9', 'image5.jpg', '2024-02-24 14:10:00'),
(2, 'Story Title 6', 'Story content for user 2', 'image6.jpg', '2024-02-25 15:25:00'),
(4, 'Story Title 7', 'Story content for user 4', 'image7.jpg', '2024-02-26 16:40:00'),
(6, 'Story Title 8', 'Story content for user 6', 'image8.jpg', '2024-02-27 17:55:00'),
(8, 'Story Title 9', 'Story content for user 8', 'image9.jpg', '2024-02-28 18:30:00'),
(10, 'Story Title 10', 'Story content for user 10', 'image10.jpg', '2024-02-29 19:45:00');

-- Inserting into Comments table
INSERT INTO comments (user_id, story_id, comment, image_url, rating, created_at)
VALUES
(2, 1, 'Comment 1 for story 1', 'comment_image1.jpg', 4.5, '2024-02-20 10:00:00'),
(4, 3, 'Comment 1 for story 3', 'comment_image3.jpg', 3.8, '2024-02-22 11:00:00'),
(6, 5, 'Comment 1 for story 5', 'comment_image5.jpg', 4.2, '2024-02-24 12:00:00'),
(8, 7, 'Comment 1 for story 7', 'comment_image7.jpg', 4.0, '2024-02-26 13:00:00'),
(10, 9, 'Comment 1 for story 9', 'comment_image9.jpg', 4.7, '2024-02-28 14:00:00'),
(1, 2, 'Comment 2 for story 1', 'comment_image1.jpg', 4.3, '2024-02-20 10:30:00'),
(3, 4, 'Comment 2 for story 3', 'comment_image3.jpg', 3.5, '2024-02-22 11:30:00'),
(5, 6, 'Comment 2 for story 5', 'comment_image5.jpg', 4.1, '2024-02-24 12:30:00'),
(7, 8, 'Comment 2 for story 7', 'comment_image7.jpg', 3.9, '2024-02-26 13:30:00'),
(9, 10, 'Comment 2 for story 9', 'comment_image9.jpg', 4.6, '2024-02-28 14:30:00');

-- Inserting into Specializations table
INSERT INTO specializations (doctor_id, specialization, description)
VALUES
(2, 'Cardiology', 'Description for Cardiology specialization'),
(4, 'Dermatology', 'Description for Dermatology specialization'),
(6, 'Endocrinology', 'Description for Endocrinology specialization'),
(8, 'Gastroenterology', 'Description for Gastroenterology specialization'),
(10, 'Neurology', 'Description for Neurology specialization'),
(1, 'Orthopedics', 'Description for Orthopedics specialization'),
(3, 'Pediatrics', 'Description for Pediatrics specialization'),
(5, 'Psychiatry', 'Description for Psychiatry specialization'),
(7, 'Urology', 'Description for Urology specialization'),
(9, 'Ophthalmology', 'Description for Ophthalmology specialization');
