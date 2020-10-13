import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar'

import Home from './components/views/Home'
import Blogs from './components/views/Blogs'
import Compose from './components/views/Compose'
import Edit from './components/views/Edit'
import Details from './components/views/Details'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/details/:_id' component={Details} />
        <Route path='/edit/:_id' component={Edit} />
        <Route path='/compose' component={Compose} />
        <Route path='/blog' component={Blogs} />
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
