import imageNotfound from '@/assets/images/404.png';

import { PATH_MAIN } from '@/routes/paths';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import {
    Content,
    ContentWrapper,
    ImageNotFound,
    LargeText,
    NotFoundWrapper,
    Title,
} from './styles';

const NotFound = () => {
    const { t } = useTranslation(['notFound']);

    return (
        <NotFoundWrapper>
            <ImageNotFound src={imageNotfound} alt="maintenance" />
            <ContentWrapper>
                <LargeText>404</LargeText>
                <Title>Not found</Title>
                <Content>Please try again</Content>
            </ContentWrapper>
            <Button href={PATH_MAIN.HOME}>Back to Sign In</Button>
        </NotFoundWrapper>
    );
};

export default NotFound;
