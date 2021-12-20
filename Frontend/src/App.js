import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './admin_style.css';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import Login from './admin_components/login';
import Signup from './admin_components/signup';
import Sidemenu from './Layouts/sidemenu';
import Dashboard from './admin_components/dashbord';
import AddUser from './admin_components/addUser';
import Notfound404 from './admin_components/notfound404';
import UserList from './admin_components/userList';
import EditUser from './admin_components/edituser';
import Protected from './protected';
import Logout from './logout';



function App() {

  return (
    <Router>
      <Switch>
        {/* Admin routes */}

        <Route exact path="/">
          <Redirect to='/login' />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {/* <Route exact path="/dashboard" component={Sidemenu} /> */}
      </Switch>
      <Switch>
        <Route exact path="/dashboard">
          <Protected cmp={Dashboard} />
        </Route>
        <Route exact path="/adduser">
          <Protected cmp={AddUser} />
        </Route>

        <Route exact path="/userlist">
          <Protected cmp={UserList} />
        </Route>

        <Route exact path="/userlist/edit/:id">
          <Protected cmp={EditUser} />
        </Route>

        <Route exact path="/requests">
          <Protected cmp={Request} />
        </Route>

       

        <Route exact path="/logout">
          <Logout cmp={Login} />
        </Route>
      
        <Route component={Notfound404} />
      </Switch>

    </Router>

  );
}

export default App;
