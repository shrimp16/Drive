import styled from 'styled-components';

export const StyledAuthButton = styled.button`
    width: fit-content;
    border: 2px rgba(111, 111, 111, 0.4) solid;
    border-radius: 10px;
    background-color: rgba(111, 111, 111, 0.2);
    color: rgba(111, 111, 111, 1);
    padding: 10px;
    font-size: 1.250rem;
    margin: auto;
    margin-top: 10px;
    transition: 0.4s;
    cursor: pointer;

    &:hover {
        border: 2px black solid;
        background-color: rgba(111, 111, 111, 0.4);
        color: black;
    }
`

export const NavButtons = styled.button`
    width: 7.5rem;
    height: 3rem;
`