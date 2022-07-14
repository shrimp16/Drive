import styled from 'styled-components';

export const StyledNavBar = styled.ul`
    list-style-type: none;
    display: flex;
    width: 10rem;
    flex-direction: column;
    justify-content: left;

    li {
        display: block;
        text-align: center;
        text-decoration: none;
        font-size: 1.25rem;
        padding: 6px 8px;
        margin: 3px;
        cursor: pointer;
        transition: 0.4s;

        &:hover {
            background-color: rgba(111, 111, 111, 0.4);
        }
    }
`

export const MainListItems = styled.a`
    text-align: center;
    text-decoration: none;
    font-size: 1.5rem;
    padding: 8px 10px;
    margin: 3px;
    cursor: pointer;
    transition: 0.4s;

    &:hover {
        background-color: rgba(111, 111, 111, 0.4);
    }
`

export const LogOut = styled.a`
    text-align: center;
    text-decoration: none;
    font-size: 1.5rem;
    padding: 8px 10px;
    margin: 3px;
    cursor: pointer;
    transition: 0.4s;

    &:hover {
        background-color: rgba(255, 0, 0, 0.4);
    }
`