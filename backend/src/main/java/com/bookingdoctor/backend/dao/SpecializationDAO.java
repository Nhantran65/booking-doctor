package com.bookingdoctor.backend.dao;

import lombok.Data;

@Data
public class SpecializationDAO {

    private int doctor_id;

    private String specialization;

    private String description;

}
