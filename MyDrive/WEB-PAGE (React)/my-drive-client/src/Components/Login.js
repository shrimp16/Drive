import { StyledSecondaryHeader } from '../Styles/Titles.styled';
import { StyledAuthContainer } from '../Styles/AuthContainer.styled';
import { StyledAuthButton } from '../Styles/Buttons.styled';
import { StyledInput } from '../Styles/Inputs.styled';

function Login() {

    return (
        <>
            <StyledAuthContainer>
                <StyledSecondaryHeader>Login</StyledSecondaryHeader>
                <StyledInput type="text" placeholder='Username/E-mail...'></StyledInput>
                <StyledInput type="password" placeholder='Password...'></StyledInput>
                <StyledAuthButton>Login</StyledAuthButton>
                <p>No account? <a href='/register'>Register</a></p>
            </StyledAuthContainer>
        </>
    )
}

export default Login;