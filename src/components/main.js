import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedAdminRoute from "./protected.admin.route"
import ProtectedRoute from "./protected.expert.route"

import Landing from './landing';
import AdminLogin from './alogin';
import ContactUs from './contactus';
import ChangePassword from './changep';
// import ProductTable from './viewAllPests';
import SendMessage from './message';
import Reservations from './viewUsers';
import EditUser from './editUser';
import Library from './library';
import Item from './item';
import Dashboard from './dashboard'
import ViewExercise from './viewExercise';
import ViewUsers from './viewUsers';
import Complaints from './Complaints';




const Main = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/alogin" component={AdminLogin} />
    <Route path="/contactus" component={ContactUs} />
    <Route path="/changep" component={ChangePassword} />
    <ProtectedRoute path="/viewExercise" component={ViewExercise} />
    <Route path="/message" component={SendMessage} />
    <ProtectedRoute path="/viewUsers" component={Reservations} />
    <ProtectedAdminRoute path="/edit/:type/:id" component={EditUser} />
    <Route path="/library" component={Library}/>
    <Route path="/item/:type/:id" component={Item}/>
    <ProtectedRoute path="/dashboard" component={Dashboard}/>
    <Route path="/viewUsers" component={ViewUsers} />
    <ProtectedRoute path="/Complaints" component={Complaints} />
  </Switch>
)

export default Main;