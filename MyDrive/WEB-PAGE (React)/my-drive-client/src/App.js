import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { StyledMainHeader, StyledSecondaryHeader } from './Styles/Titles.styled';
import { StyledAuthContainer } from './Styles/AuthContainer.styled';
import { StyledAuthButton } from './Styles/Buttons.styled';

function App() {
  return (
    <>
      <Router>
        <StyledMainHeader>My Drive</StyledMainHeader>
        <StyledAuthContainer>
          <StyledSecondaryHeader>Register</StyledSecondaryHeader>
          <input></input>
          <input></input>
          <input></input>
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
