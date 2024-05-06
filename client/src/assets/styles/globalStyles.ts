import { css } from '@emotion/react';
import theme from './theme';
import OpenSanFontRegular from '@/assets/fonts/OpenSans-Regular.ttf';
import OpenSanFontBold from '@/assets/fonts/OpenSans-Bold.ttf';
import OpenSanFontMedium from '@/assets/fonts/OpenSans-Medium.ttf';
import OpenSanFontItalic from '@/assets/fonts/OpenSans-Italic.ttf';
import OpenSanFontSemiBold from '@/assets/fonts/OpenSans-SemiBold.ttf';
import RobotoFontRegular from '@/assets/fonts/Roboto-Regular.ttf';
import RobotoFontBold from '@/assets/fonts/Roboto-Bold.ttf';
import RobotoFontMedium from '@/assets/fonts/Roboto-Medium.ttf';
import RobotoFontItalic from '@/assets/fonts/Roboto-Italic.ttf';

const globalStyles = css`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

    :root {
        font-size: 13px !important;
        box-sizing: border-box;
    }

    * {
        font-family: 'Roboto', sans-serif !important;
    }

    .w-100 {
        width: 100% !important;
    }

    @font-face {
        font-family: 'Open Sans';
        src: url(${OpenSanFontRegular}) format('truetype');
        font-weight: 400;
    }
    @font-face {
        font-family: 'Open Sans';
        src: url(${OpenSanFontMedium}) format('truetype');
        font-weight: 500;
    }
    @font-face {
        font-family: 'Open Sans';
        src: url(${OpenSanFontSemiBold}) format('truetype');
        font-weight: 600;
    }
    @font-face {
        font-family: 'Open Sans';
        src: url(${OpenSanFontBold}) format('truetype');
        font-weight: 700;
    }
    @font-face {
        font-family: 'Open Sans';
        src: url(${OpenSanFontItalic}) format('truetype');
        font-style: italic;
    }
    @font-face {
        font-family: 'Roboto';
        src: url(${RobotoFontRegular}) format('truetype');
        font-weight: 400;
    }
    @font-face {
        font-family: 'Roboto';
        src: url(${RobotoFontMedium}) format('truetype');
        font-weight: 500;
    }
    @font-face {
        font-family: 'Roboto';
        src: url(${RobotoFontBold}) format('truetype');
        font-weight: 700;
    }
    @font-face {
        font-family: 'Roboto';
        src: url(${RobotoFontItalic}) format('truetype');
        font-style: italic;
    }
    * {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
        font-family: ${theme.fFamily};
    }
    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }
    body {
        color: ${theme.colorText};
        font-size: 14px;
    }
    a {
        text-decoration: none;
        /* color: inherit; */
        /* &:hover {
            color: inherit;
        } */
    }
    ol,
    ul {
        list-style: none;
    }
    blockquote,
    q {
        quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    html {
        line-height: normal;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 9999s ease-in-out 0s;
    }
    ::-webkit-scrollbar-track {
        margin-top: 2px;
        background-color: transparent;
    }
    ::-webkit-scrollbar {
        width: 7px;
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgb(194, 196, 209);
    }

    .msg-container {
        .msg-title {
            font-weight: bold;
        }
        .msg-description {
        }
    }

    .custom-icon {
        svg {
            color: #fff;
        }
    }
`;

export default globalStyles;
