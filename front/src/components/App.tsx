import { Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import Header from './Header';
import Users from './Users';
import User from './User';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:username" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
