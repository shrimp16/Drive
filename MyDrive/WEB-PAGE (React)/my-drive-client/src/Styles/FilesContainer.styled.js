import styled from 'styled-components';

export const StyledFilesContainer = styled.div`
    max-width: 80%;
    max-height: ${props => props.height - 110}px;
    overflow: scroll;

    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

`