import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
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
