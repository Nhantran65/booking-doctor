package com.bookingdoctor.backend.service;

import com.bookingdoctor.backend.dao.CommentDAO;
import com.bookingdoctor.backend.entity.CommentEntity;
import com.bookingdoctor.backend.entity.StoryEntity;
import com.bookingdoctor.backend.entity.UserEntity;
import com.bookingdoctor.backend.repository.CommentRepository;
import com.bookingdoctor.backend.repository.StoryRepository;
import com.bookingdoctor.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    private final UserRepository userRepository;

    private final StoryRepository storyRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, UserRepository userRepository, StoryRepository storyRepository){
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.storyRepository = storyRepository;
    }

    public Optional<CommentEntity> getComment(int id){
        return commentRepository.findById(id);
    }

    public List<CommentEntity> getAll(){
        return commentRepository.findAll();
    }

    public CommentEntity addComment(CommentDAO comment){
        Optional<UserEntity> userEntityOptional = userRepository.findById(comment.getUser_id());
        Optional<StoryEntity> storyEntityOptional = storyRepository.findById(comment.getStory_id());

        StoryEntity story = storyEntityOptional.orElseThrow();
        UserEntity user = userEntityOptional.orElseThrow();

        CommentEntity newComment = new CommentEntity();
        newComment.setUser(user);
        newComment.setStory(story);
        newComment.setComment(comment.getComment());
        newComment.setImage(comment.getComment());
        newComment.setRating(comment.getRating());
        newComment.setCreated_at(new Date());

        return commentRepository.save(newComment);
    }

    public void deleteComment(int id){
        commentRepository.deleteById(id);
    }

    public CommentEntity updateComment(CommentDAO comment, int id){
        Optional<CommentEntity> commentEntity = commentRepository.findById(id);

        Optional<UserEntity> userEntityOptional = userRepository.findById(comment.getUser_id());
        Optional<StoryEntity> storyEntityOptional = storyRepository.findById(comment.getStory_id());

        UserEntity user = userEntityOptional.orElseThrow();
        StoryEntity story = storyEntityOptional.orElseThrow();

        if(commentEntity.isPresent()){
            CommentEntity newComment = new CommentEntity();

            newComment.setUser(user);
            newComment.setStory(story);
            newComment.setComment(comment.getComment());
            newComment.setImage(comment.getImage());
            newComment.setRating(comment.getRating());

            return commentRepository.save(newComment);
        }
        else {
            return null;
        }
    }

}
