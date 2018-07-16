import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
//If you want to have default component e.g.(NotFound page component),
//you have to import Switch which will render only the first found component.
//Then you have to wrap routes in <Switch></Switch>
//REMEMBER: DEFAULT ROUTE/COMPONENT HAS TO BE LAST ADDED!

//Add all components without header, footer etc..
import Home from './Home';
import AddCatFood from "./Add";
import AllCatFood from "./All";
import NotFound from "./NotFound";

const isLogged = () => {
    if (localStorage.getItem('username')) {
        return true;
    }
    return false;
}

//Route with no path - used for not found pages.
const AppRouter = () => (
    <div>
        <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/add" component={AddCatFood}/>
            <Route path="/all/:foodId" component={AllCatFood}/>
            <Route path="/all" component={AllCatFood}/>
            <Route exact path="/" render={() => (
                isLogged() ? (<Redirect to="/welcomeUser"/>)
                    : (<Redirect to="/home"/>)
            )}/>
            <Route component={NotFound}/>
        </Switch>
    </div>
)

export default AppRouter;