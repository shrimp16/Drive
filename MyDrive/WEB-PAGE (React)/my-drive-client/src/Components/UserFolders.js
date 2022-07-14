import { StyledFolder } from '../Styles/NavBar.styled';

function UserFolders(props) {

    if (props.viewFolders) {
        return (
            <>
                <StyledFolder>Root</StyledFolder>
                <StyledFolder>Root</StyledFolder>
                <StyledFolder>Root</StyledFolder>
                <StyledFolder>Root</StyledFolder>
                <StyledFolder>Root</StyledFolder>
            </>
        )
    }
}

export default UserFolders;