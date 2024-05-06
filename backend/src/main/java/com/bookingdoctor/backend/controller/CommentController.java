package com.bookingdoctor.backend.controller;

import com.bookingdoctor.backend.dao.CommentDAO;
import com.bookingdoctor.backend.entity.CommentEntity;
import com.bookingdoctor.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/comment")
@RestController
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("")
    public CommentEntity getComment(@RequestParam int id) {
        Optional<CommentEntity> comment = commentService.getComment(id);
        return (CommentEntity) comment.orElseThrow();
    }

    @GetMapping("/story")
    public List<CommentEntity> getCommentByStoryId(@RequestParam int id) {
        return commentService.getAllByStoryId(id);
    }

    @GetMapping("/all")
    public List<CommentEntity> getAll() {
        return commentService.getAll();
    }

    @PostMapping("/add")
    public CommentEntity addComment(@RequestBody CommentDAO comment) {
        return commentService.addComment(comment);
    }

    @PutMapping("/update")
    public void updateComment(@RequestBody CommentDAO comment, @RequestParam int id) {
        commentService.updateComment(comment, id);
    }

    @DeleteMapping("/delete")
    public void deleteComment(@RequestParam int id) {
        commentService.deleteComment(id);
    }
}
