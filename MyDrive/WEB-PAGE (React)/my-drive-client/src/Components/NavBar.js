import { StyledNavBar, FoldersButton, FoldersContainer, LogOutButton } from '../Styles/NavBar.styled';
import UserFolders from './UserFolders';
import { useState, useLayoutEffect } from 'react';

function NavBar() {

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

    const [viewFolders, setViewFolders] = useState(false);


    const [width, heigth] = useWindowSize();

    return (
        <>
            <StyledNavBar heigth={window.innerHeight}>
                <FoldersButton onClick={() => setViewFolders(!viewFolders)}>Folders</FoldersButton>
                <FoldersContainer>
                    <UserFolders viewFolders={viewFolders} />
                </FoldersContainer>
                <LogOutButton>Log Out</LogOutButton>
            </StyledNavBar>
        </>
    )
}

export default NavBar;