import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Headers from './components/Header/Header';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreateMemory from './components/CreateMemory/CreateMemory';
import ListMemories from './components/ListMemories/ListMemories';
const App = () => {

  return (
    <Fragment>
      <BrowserRouter>
      <Headers />
      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <ProtectedRoute path="/creatememory" component={CreateMemory} />
        <ProtectedRoute path="/listmemories" component={ListMemories} />
      </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
