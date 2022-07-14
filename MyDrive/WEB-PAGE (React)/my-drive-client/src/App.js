import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { StyledMainHeader } from './Styles/Titles.styled';

import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';

function App() {

  return (
    <>
      <Router>
        <StyledMainHeader>My Drive</StyledMainHeader>
        <Routes>
          <Route path='/' element={<Home/>} ></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
