
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateLink from './components/CreateLink';
import Header from './components/Header';
import LinkList from './components/LinkList';
import Login from './components/Login';
import Search from './components/Search';

function App() {
  return (
    <div>
      <Header />

      <div className="ph3 pv1 background-gray">
        <Routes>
          <Route path="/" element={<Navigate replace to="/new/1" />} />
          <Route path="/" element={<LinkList />} />
          <Route path="/create" element={<CreateLink />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
