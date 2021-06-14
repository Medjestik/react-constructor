import React from 'react';
import './Main.css';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header.js';
import Person from '../Person/Person.js';
import MainPage from '../MainPage/MainPage.js';
import Development from '../Development/Development.js';
import Dpp from '../Development/Dpp/Dpp.js';
import Control from '../Control/Control.js';
import Method from '../Method/Method.js';
import Discussion from '../Discussion/Discussion.js';

function Main({ pathname, onLogout, history }) {

  const [showHeaderMenu, setShowHeaderMenu] = React.useState(true);

  return (
    <div className="main">

      <Header
        onLogout={onLogout}
        showHeaderMenu={showHeaderMenu}
        setShowHeaderMenu={setShowHeaderMenu}
      />

      <div className={`main__translation ${showHeaderMenu ? "main__show-menu" : "main__hide-menu"}`}>
        <div className={`main__container ${showHeaderMenu ? "main__container_direction_left" : "main__container_direction_center"}`}>

        <Switch>    
            <Route path="/main" exact>
              <MainPage />
            </Route>
          </Switch>

          <Switch>    
            <Route path="/main/person" exact>
              <Person />
            </Route>
          </Switch>

          <Switch>    
            <Route path="/main/development" exact>
              <Development
                history={history} 
              />
            </Route>
          </Switch>

          <Switch>    
            <Route path="/main/development/dpp">
              <Dpp 
                history={history}
                pathname={pathname}
              />
            </Route>
          </Switch>

          <Switch>    
            <Route path="/main/method" exact>
              <Method />
            </Route>
          </Switch>

          <Switch>    
            <Route path="/main/discussion" exact>
              <Discussion />
            </Route>
          </Switch>

          <Switch>    
            <Route path="/main/control" exact>
              <Control />
            </Route>
          </Switch>

        </div>
      </div>
    </div>
  );
}

export default Main;
