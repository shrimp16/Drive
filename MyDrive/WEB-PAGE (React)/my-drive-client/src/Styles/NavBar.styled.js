import styled from 'styled-components';

export const StyledNavBar = styled.ul`
    width: 15%;
    height: ${props => props.heigth - 110}px;
`


export const FoldersButton = styled.li`
    padding: 1.5rem;
    text-align: center;
    transition: 0.5s;
    cursor: pointer;

    &:hover {
        background-color: rgba(111, 111, 111, 0.5);
    }
`

export const FoldersContainer = styled.div`
    height: 80%;
    overflow: scroll;
    scrollbar-width: none;
    
    &::-webkit-scrollbar{
        display: none;
    }
`

export const StyledFolder = styled.li`
    padding: 1.35rem;
    text-align: center;
    background-color: green;
`

export const LogOutButton = styled.li`
    padding: 1.5rem;
    text-align: center;
    transition: 0.5s;
    cursor: pointer;

    &:hover {
        background-color: rgba(255, 0, 0, 0.4);
    }
`