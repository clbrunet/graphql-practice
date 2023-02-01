import { Route, Routes } from 'react-router-dom';
import './../styles/App.css';
import Header from './Header';
import Users from './Users';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
