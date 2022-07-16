import { StyledFilesContainer } from '../Styles/FilesContainer.styled';
import image from '../Images/test-image.jpg';

import { StyledImage } from '../Styles/Image.styled';

function FilesContainer() {

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