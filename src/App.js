
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateLink from './components/CreateLink';
import Header from './components/Header';
import LinkList from './components/LinkList';

function App() {
  return (
    <div>
      <Header />
      
      <div className="ph3 pv1 background-gray">
        <Routes>
          <Route path="/" element={<LinkList />} />
          <Route path="/create" element={<CreateLink />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
