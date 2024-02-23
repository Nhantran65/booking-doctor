package com.bookingdoctor.backend.dao;

import lombok.Data;

@Data
public class CommentDAO {

    private int user_id;

    private int story_id;

    private String comment;

    private String image;

    private Float rating;

}
