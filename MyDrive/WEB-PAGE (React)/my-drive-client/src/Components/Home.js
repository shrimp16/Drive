import { StyledNavBar, FoldersButton, FoldersContainer, LogOutButton, StyledFolder } from '../Styles/NavBar.styled';
import { StyledHomeContainer } from '../Styles/HomeContainer.styled';

import { useState, useLayoutEffect } from 'react';

import UserFolders from './UserFolders';

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

function Home() {

    const [viewFolders, setViewFolders] = useState(false);


    const [width, heigth] = useWindowSize();
    
    return (
        <>

            <StyledHomeContainer>
                <StyledNavBar heigth={window.innerHeight}>
                    <FoldersButton>Folders</FoldersButton>
                    <FoldersContainer>
                    </FoldersContainer>
                    <LogOutButton>Log Out</LogOutButton>
                </StyledNavBar>
            </StyledHomeContainer>
        </>
    )
}

export default Home;