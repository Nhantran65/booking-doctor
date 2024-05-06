import { css } from "@emotion/react";
import styled from "@emotion/styled";

const fullStyles = css`
    position: fixed;
    background: rgba(255, 255, 255, 0.7);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const noneFullStyles = css`
    padding: 10px 0;
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const LoadingWrapper = styled.div<{ isFull?: boolean }>`
    ${({ isFull }) => (isFull ? fullStyles : noneFullStyles)}
`;
