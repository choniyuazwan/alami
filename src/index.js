import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Country from './Container/Produk';
import CountryAdd from './Container/Produk/Add';
import ProvinceAdd from './Container/Penjual/Add';

const routes = [
  '/',
  '/produk',
  '/penjual',
];

ReactDOM.render(
  <Router>
    <div>
      {routes.map((route, index) =>{
        const exact = route==='/';
        return (
          <Route
            key={index}
            path={route}
            exact={exact}
            render={() => <App/>}
          />
        )})}
      <Switch>
        <Route path="/" exact> <Country/> </Route>
        <Route path="/produk" exact> <Country/> </Route>
        <Route path="/produk/add" exact> <CountryAdd/> </Route>
        <Route path="/penjual" exact> <ProvinceAdd/> </Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
