import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { StyledMainHeader } from './Styles/Titles.styled';

import Register from './Components/Register';
import Login from './Components/Login';

function App() {
  return (
    <>
      <Router>
        <StyledMainHeader>My Drive</StyledMainHeader>
        <Routes>
          <Route path='/'></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
