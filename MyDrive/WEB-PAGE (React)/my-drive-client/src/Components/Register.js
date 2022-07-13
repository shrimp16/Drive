import { StyledMainHeader, StyledSecondaryHeader } from '../Styles/Titles.styled';
import { StyledAuthContainer } from '../Styles/AuthContainer.styled';
import { StyledAuthButton } from '../Styles/Buttons.styled';
import { StyledInput } from '../Styles/Inputs.styled';

function Register() {

    return (
        <>
            <StyledMainHeader>My Drive</StyledMainHeader>
            <StyledAuthContainer>
                <StyledSecondaryHeader>Register</StyledSecondaryHeader>
                <StyledInput type="text" placeholder='Username...'></StyledInput>
                <StyledInput type="email" placeholder='E-mail...'></StyledInput>
                <StyledInput type="password" placeholder='Password...'></StyledInput>
                <StyledAuthButton>Register</StyledAuthButton>
                <p>Already registered? <a href='/login'>Login</a></p>
            </StyledAuthContainer>
        </>
    )
}

export default Register;