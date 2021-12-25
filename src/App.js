import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './pages/Chat';
import './App.css';
import Login from './pages/Login';

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className='app'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <div className='app__body'>
              <Sidebar />
              <Switch>
                <Route path='/room/:roomId'>
                  <Chat />
                </Route>
                <Route path='/'>
                  <Chat />
                </Route>
              </Switch>
            </div>
          </>
        )}
      </Router>
    </div>
  );
};

export default App;
