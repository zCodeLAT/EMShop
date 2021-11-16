import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/layout';
import Routes from './routes.js';
import './App.css';
import './components/layout/index.js';

function App() {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
}

export default App;
