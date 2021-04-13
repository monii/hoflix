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
import Production from '../Routes/Production';
import Season from '../Routes/Season';

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
        <Route path="/movie/:id/video" exact component={Video} />
        <Route path="/show/:id/video" exact component={Video} />
        <Route path="/movie/:id/production" exact component={Production} />
        <Route path="/show/:id/production" exact component={Production} />
        <Route path="/show/:id/season" exact component={Season} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);

export default Rounter;
