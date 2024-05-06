import styled from "@emotion/styled";
import BACKGROUND from "@/assets/images/Background_Image.png";
import { Button } from "antd";
import { blue } from "@ant-design/colors";
import AVATAR from "@/assets/images/doctor_avatar.png";

export const HomeWrapper = styled.div`
`;
export const Wrapper = styled.div`
    
`;


export const SubWrapper1 = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 150px); 
    background-image: url(${BACKGROUND});
    background-repeat: no-repeat;
    background-size: cover;
    width:100%;
    top:0;
    box-shadow: 0 0 3px #000;

`;
export const SubWrapper2 = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 150px); 
    background-repeat: no-repeat;
    background-size: cover;
    width:100%;
    bottom:0;
    max-width: 1400px;
    margin: auto;
`;

export const ButtonLink = styled(Button)`
    margin-top: 20px;
    background-color: ${blue[5]};
    height: 80px;
    width: 300px;
    font-size:20px;
    font-weight:600;
    text-align: center;
    color: #fff;
    margin: 20px auto;
`;

export const LinkToPage = styled.a`
    top:0;
    color: yellow;
    font-weight: 600;
    padding: 10px;
    font-size: 16px;
`

export const Slogan = styled.h1`
  font-weight: 1000;
  font-size: 50px;
  margin-top: 200px;
  text-align: center;
  color: ${blue[6]};
  margin-left: 80px;
  margin-right: 80px;
`

export const SubWrapperContent = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 100px 0;
`

export const Doctor = styled.div`
  height: 260px;
  width: 24%; 
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 20px;
  background-color: #fff;
`;

export const DoctorName = styled.span`
  font-family: Inter, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 2px solid #ccc;
`;

export const DoctorAvatar = styled.img`
  width: 30%; 
  height: 40%;
  margin: auto; /* Để căn giữa theo chiều ngang */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;


export const ListInfo = styled.ul`

`

export const ListInfoChild = styled.li`

`

export const Specialization = styled.div`

`

export const TitleAttribute = styled.span`
    font-weight: 600;

`
export const SubSlogan = styled.h1`
  font-weight: 800;
  font-size: 30px;
  margin-top: 100px;
  text-align: center;
  color: ${blue[6]};
  margin-left: 100px;
  margin-right: 100px;
`