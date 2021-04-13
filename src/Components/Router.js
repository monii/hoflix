import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Home from '../Routes/Home';
import TV from '../Routes/TV';
import Header from '../Components/Header';
import Search from '../Routes/Search';
import Detail from '../Routes/Detail';
import Video from '../Routes/Video';

const Rounter = () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" exact component={Detail} />
        <Route path="/show/:id" exact component={Detail} />
        <Route path="/movie/:id/video" component={Video} />
        <Route path="/show/:id/video" component={Video} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);

export default Rounter;
