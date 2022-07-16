import { StyledFilesContainer } from '../Styles/FilesContainer.styled';

import { StyledImage } from '../Styles/Image.styled';

import { useState, useLayoutEffect } from 'react';

function FilesContainer() {

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }

    useWindowSize();

    return (
        <>
            <StyledFilesContainer height={window.innerHeight}>
            </StyledFilesContainer>
        </>
    )
}

export default FilesContainer;