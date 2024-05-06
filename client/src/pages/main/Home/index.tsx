import { getListSpecializationAPI } from '@/api/specialization';
import AVATAR from '@/assets/images/doctor_avatar.png';
import Loading from '@/components/Loading';
import { FETCH_STATUS } from '@/models/enums';
import { IGetListSpecializationParams, ISpecialization } from '@/models/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    ButtonLink,
    Doctor,
    DoctorAvatar,
    DoctorName,
    HomeWrapper,
    LinkToPage,
    ListInfo,
    ListInfoChild,
    Slogan,
    Specialization,
    SubSlogan,
    SubWrapper1,
    SubWrapper2,
    SubWrapperContent,
    TitleAttribute,
    Wrapper,
} from './styles';
import { Card } from 'antd';
import { PATH_MAIN } from '@/routes/paths';

const Home = () => {
    const { t } = useTranslation(['Home']);

    const { data: listSpecializations, fetchStatus } = useQuery({
        queryKey: ['specializations'],
        queryFn: async () => {
            const params: IGetListSpecializationParams = {};
            return await getListSpecializationAPI(params);
        },
    });

    // Get 4 listSpecializations
    if (listSpecializations) listSpecializations.length = 4;

    return (
        <HomeWrapper>
            {fetchStatus === FETCH_STATUS.FETCHING ? (
                <Loading />
            ) : (
                <Wrapper>
                    <SubWrapper1>
                        <LinkToPage href="/">Home</LinkToPage>
                        <Slogan>Make a Doctor's appointment faster with Booking Care</Slogan>
                        <ButtonLink>
                            <Link to={PATH_MAIN.APPOINTMENT}>
                                {t('Book An Appointment')}
                            </Link>
                        </ButtonLink>
                    </SubWrapper1>
                    <SubWrapper2>
                        <SubSlogan>Doctor Information & Their Contact</SubSlogan>
                        <SubWrapperContent>
                            {listSpecializations?.map((specialization: ISpecialization) => (
                                <Card
                                    key={specialization.id}
                                    title={specialization.specialization}
                                    bordered={false}
                                    style={{ width: 300 }}
                                >
                                    <DoctorAvatar src={AVATAR} />
                                    <DoctorName>
                                        Full Name: {specialization.user.firstname}{' '}
                                        {specialization.user.lastname}
                                    </DoctorName>
                                    <ListInfo>
                                        <ListInfoChild>
                                            <TitleAttribute>Description:</TitleAttribute>{' '}
                                            {specialization.description}
                                        </ListInfoChild>
                                        <ListInfoChild>
                                            <TitleAttribute>Bio:</TitleAttribute>{' '}
                                            {specialization.user.bio}
                                        </ListInfoChild>
                                        <ListInfoChild>
                                            <TitleAttribute>Email:</TitleAttribute>{' '}
                                            {specialization.user.email}
                                        </ListInfoChild>
                                    </ListInfo>
                                </Card>
                            ))}
                        </SubWrapperContent>
                        <ButtonLink>
                            <Link to={'http://localhost:5173/doctor'}>{t('View all doctors')}</Link>
                        </ButtonLink>
                    </SubWrapper2>
                </Wrapper>
            )}
        </HomeWrapper>
    );
};

export default Home;
