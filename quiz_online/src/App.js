import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import LoginPage from './Pages/LoginPage'
import { RoleContent } from './Pages/RoleContent';
import { HomeStudent } from './components/TagPage/HomeStudent';
import { HomeAdmin } from './components/TagPage/HomeAdmin';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route  path="/role" render={ () =>{
            return localStorage.getItem("USER_KEY") ? <RoleContent/> : <Redirect to = '/' />
          }
        } >

        </Route>
        <Route  path="/admin" >
              <HomeAdmin />
            </Route>

            <Route  path="/student" >
              <HomeStudent />
            </Route>
      </Switch>

    </Router>
  );
}

export default App;