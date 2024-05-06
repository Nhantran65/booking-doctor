import { css } from "@emotion/react";

export const flex = (columnGap?: number, rowGap?: number, justify?: string, isWrap?: boolean) => css`
    display: flex;
    flex-wrap: ${isWrap === undefined || isWrap === true ? "wrap" : undefined};
    justify-content: ${justify ? justify : undefined};
    align-items: center;
    column-gap: ${columnGap ? `${columnGap}px` : undefined};
    row-gap: ${rowGap ? `${rowGap}px` : undefined};
`;
export const flexCenter = (direction?: string, columnGap?: number, rowGap?: number) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    ${direction ? `flex-direction: ${direction}` : undefined};
    ${columnGap ? `column-gap: ${columnGap}px` : undefined};
    ${rowGap ? `row-gap: ${rowGap}px` : undefined};
`;
export const grid = (columns: number) => css`
    display: grid;
    grid-template-columns: ${`repeat(${columns}, 1fr)`};
`;
