import { StyledHomeContainer } from '../Styles/HomeContainer.styled';
import NavBar from './NavBar';

import FilesContainer from './FilesContainer';

function Home() {

    return (
        <>
            <StyledHomeContainer>
                <NavBar />
                <FilesContainer />
            </StyledHomeContainer>
        </>
    )
}

export default Home;