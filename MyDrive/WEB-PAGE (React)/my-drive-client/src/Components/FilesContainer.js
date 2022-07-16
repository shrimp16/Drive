import { StyledFilesContainer } from '../Styles/FilesContainer.styled';
import image from '../Images/test-image.jpg';

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
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
                <StyledImage src={image} alt='test'></StyledImage>
            </StyledFilesContainer>
        </>
    )
}

export default FilesContainer;