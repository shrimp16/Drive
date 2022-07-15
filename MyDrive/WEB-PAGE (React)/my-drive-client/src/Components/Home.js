import { StyledHomeContainer } from '../Styles/HomeContainer.styled';
import { StyledFilesContainer } from '../Styles/FilesContainer.styled';
import NavBar from './NavBar';

function Home() {

    return (
        <>
            <StyledHomeContainer>
                <NavBar />
                <StyledFilesContainer height={window.innerHeight}></StyledFilesContainer>
            </StyledHomeContainer>
        </>
    )
}

export default Home;