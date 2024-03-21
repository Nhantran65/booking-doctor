package com.bookingdoctor.backend.dao;

import lombok.Data;

@Data
public class AppointmentDAO {

    private int doctor_id;

    private int patient_id;

    private int clinic_id;

    private int status_id;

    private String note;
}
