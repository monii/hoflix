import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family:font-family: inherit;
        font-size:12px;
        background-color:rgba(20, 20, 20, 1);
        color:white;
    }
`;

export default GlobalStyles;
