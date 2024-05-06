import { Skeleton, Spin } from "antd";
import { LoadingWrapper } from "./styles";

interface ILoading {
    isFull?: boolean;
    isSkeleton?: boolean;
}

const Loading = ({ isFull, isSkeleton = false }: ILoading) => {
    return (
        <>
            {isSkeleton ? (
                <Skeleton active avatar />
            ) : (
                <LoadingWrapper isFull={isFull}>
                    <Spin />
                </LoadingWrapper>
            )}
        </>
    );
};

export default Loading;
