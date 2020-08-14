import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer';
import MainContent from './components/MainContent/MainContent';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
