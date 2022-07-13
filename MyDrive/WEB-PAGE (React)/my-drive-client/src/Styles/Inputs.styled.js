import styled from 'styled-components';

export const StyledInput = styled.input`
    width: 20rem;
    height: 2rem;
    font-size: 1.5rem;
    margin: auto;
    margin-top: 10px;
    border: 2px lightgray solid;
    border-radius: 8px;

    &::selection {
        border: 2px black solid;
    }
`