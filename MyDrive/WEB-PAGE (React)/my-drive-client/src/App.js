import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { StyledMainHeader, StyledSecondaryHeader } from './Styles/Titles.styled';
import { StyledAuthContainer } from './Styles/AuthContainer.styled';
import { StyledAuthButton } from './Styles/Buttons.styled';
import { StyledInput } from './Styles/Inputs.styled';

function App() {
  return (
    <>
      <Router>
        <StyledMainHeader>My Drive</StyledMainHeader>
        <StyledAuthContainer>
          <StyledSecondaryHeader>Register</StyledSecondaryHeader>
          <StyledInput type="text"></StyledInput>
          <StyledInput type="email"></StyledInput>
          <StyledInput type="password"></StyledInput>
          <StyledAuthButton>Register</StyledAuthButton>
        </StyledAuthContainer>
        <Routes>
          <Route path='/'></Route>
          <Route path='/register'></Route>
          <Route path='/login'></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
