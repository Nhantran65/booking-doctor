package com.bookingdoctor.backend.service;

import com.bookingdoctor.backend.entity.NotificationEntity;
import com.bookingdoctor.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    private final NotificationRepository repository;

    @Autowired
    public NotificationService(NotificationRepository repository) {
        this.repository = repository;
    }

    public List<NotificationEntity> getAllNotificationsByRecipientId(int recipientId) {
         return repository.findAllByRecipientId(recipientId);
    }

    public Optional<NotificationEntity> getNotificationById(int id) {
        return repository.findById(id);
    }

    public void deleteNotification(int id) {
        repository.deleteById(id);
    }
}
