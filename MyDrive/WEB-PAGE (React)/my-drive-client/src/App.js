import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './Components/Register';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/'></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login'></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
