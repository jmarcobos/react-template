import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/shared/navbar/navbar';
import Inicio from './components/content/inicio/inicio';
import Viajes from './components/content/viajes/viajes';
import Viaje from './components/content/viaje/viaje';
import Login from './components/content/login/login';
import Recordar from './components/content/recordar/recordar';
import Personal from './components/content/user_area/user_area';
import MisViajes from './components/content/mis_viajes/mis_viajes';
import Footer from './components/shared/footer/footer';
import './app.css';
import './mystyles.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch> 
            <Route path='/' exact component={Inicio} />          
            <Route path='/viajes' component={Viajes} />
            <Route path='/viaje/:id' component={Viaje} />
            <Route path='/login' component={Login} />
            <Route path='/recordar' component={Recordar} />
            <Route path='/personal' component={Personal} />
            <Route path='/misviajes' component={MisViajes} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>   
    );
  }
}

export default App;
