import { StyledNavBar, MainListItems, LogOut } from '../Styles/NavBar.styled';

import { useState } from 'react';

import UserFolders from './UserFolders';

function Home() {

    const [viewFolders, setViewFolders] = useState(false);

    return (
        <>
            <StyledNavBar>
                <MainListItems onClick={() => setViewFolders(!viewFolders)}>Folders</MainListItems>
                <UserFolders viewFolders={viewFolders}></UserFolders>
                <LogOut>Log Out</LogOut>
            </StyledNavBar>
        </>
    )
}

export default Home;