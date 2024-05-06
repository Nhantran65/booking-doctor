import React, { Dispatch, SetStateAction } from "react";
import ReactQuill from "react-quill";
interface ISpecialization {
    id: number;
    user: {
        id: number ,
        firstname: string,
        lastname: string,
        email: string,
        passwordHash: string,
        profilePicture: string,
        bio: string,
        role: "doctor"
    };
    specialization: string;
    description: string;
}

interface IGetListSpecializationParams {
    
}
interface IGetListSpecializationResponse {
    
}
