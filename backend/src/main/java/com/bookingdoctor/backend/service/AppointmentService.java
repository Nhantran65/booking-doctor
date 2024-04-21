package com.bookingdoctor.backend.service;

import com.bookingdoctor.backend.dao.AppointmentDAO;
import com.bookingdoctor.backend.dao.CommentDAO;
import com.bookingdoctor.backend.dao.StoryDAO;
import com.bookingdoctor.backend.entity.*;
import com.bookingdoctor.backend.repository.*;
import jdk.jshell.Snippet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    private final AppointmentRepository repository;

    private final UserRepository userRepository;

    private final ClinicRepository clinicRepository;

    private final StatusRepository statusRepository;

    @Autowired
    public AppointmentService(AppointmentRepository repository, UserRepository userRepository,
                              ClinicRepository clinicRepository, StatusRepository statusRepository){
        this.repository = repository;
        this.userRepository = userRepository;
        this.statusRepository = statusRepository;
        this.clinicRepository = clinicRepository;
    }

    public Optional<AppointmentEntity> getAppointment(int id){
        return repository.findById(id);
    }

    public List<AppointmentEntity> getAll(){
        return repository.findAll();
    }

    public AppointmentEntity addAppointment(AppointmentDAO appointment){
        Optional<UserEntity> doctorEntityOptional = userRepository.findById(appointment.getDoctor_id());
        UserEntity doctor = doctorEntityOptional.orElseThrow();

        Optional<UserEntity> patientEntityOptional = userRepository.findById(appointment.getPatient_id());
        UserEntity patient = patientEntityOptional.orElseThrow();

        Optional<ClinicEntity> clinicEntityOptional = clinicRepository.findById(appointment.getClinic_id());
        ClinicEntity clinic = clinicEntityOptional.orElseThrow();

        Optional<StatusEntity> statusEntityOptional = statusRepository.findById(appointment.getStatus_id());
        StatusEntity status = statusEntityOptional.orElseThrow();

        AppointmentEntity appointmentEntity = new AppointmentEntity();

        appointmentEntity.setDoctor(doctor);
        appointmentEntity.setPatient(patient);
        appointmentEntity.setClinic(clinic);
        appointmentEntity.setStatus(status);
        appointmentEntity.setAppointment_date(new Date());
        appointmentEntity.setNote(appointment.getNote());

        return repository.save(appointmentEntity);
    }

    public void deleteAppointment(int id){
        repository.deleteById(id);
    }

    public AppointmentEntity updateAppointment(AppointmentDAO appointment, int id){
        Optional<AppointmentEntity> appointmentEntity = repository.findById(id);

        Optional<UserEntity> doctorEntityOptional = userRepository.findById(appointment.getDoctor_id());
        Optional<UserEntity> patientEntityOptional = userRepository.findById(appointment.getPatient_id());
        Optional<ClinicEntity> clinicEntityOptional = clinicRepository.findById(appointment.getClinic_id());
        Optional<StatusEntity> statusEntityOptional = statusRepository.findById(appointment.getStatus_id());

        UserEntity doctor = doctorEntityOptional.orElseThrow();
        UserEntity patient = patientEntityOptional.orElseThrow();
        ClinicEntity clinic = clinicEntityOptional.orElseThrow();
        StatusEntity status = statusEntityOptional.orElseThrow();

        if(appointmentEntity.isPresent()){
            AppointmentEntity newAppointment = new AppointmentEntity();

            newAppointment.setId(id);
            newAppointment.setDoctor(doctor);
            newAppointment.setPatient(patient);
            newAppointment.setClinic(clinic);
            newAppointment.setStatus(status);
            newAppointment.setAppointment_date(new Date());
            newAppointment.setNote(appointment.getNote());

            return repository.save(newAppointment);
        }
        else {
            return null;
        }
    }
}
