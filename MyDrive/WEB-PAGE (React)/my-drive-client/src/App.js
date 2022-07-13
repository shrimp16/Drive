import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MainTitle } from './Styles/Titles.styled';

function App() {
  return (
    <>
      <Router>
        <MainTitle>My Drive</MainTitle>
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
