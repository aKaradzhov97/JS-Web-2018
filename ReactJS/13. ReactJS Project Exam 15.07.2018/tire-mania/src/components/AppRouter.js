import React from 'react';
import { Route, Switch } from 'react-router-dom';
//If you want to have default component e.g.(NotFound page component),
//you have to import Switch which will render only the first found component.
//Then you have to wrap routes in <Switch></Switch>
//REMEMBER: DEFAULT ROUTE/COMPONENT HAS TO BE LAST ADDED!

//Add all components without header, footer etc..
import Home from './home/Home';
import LoginForm from "./user/LoginForm";
import RegisterForm from './user/RegisterForm';
import Logout from "./user/Logout";
import Account from "./user/Account";
import Faq from './about/Faq';
import CreateAdForm from "./crud/create/CreateAdForm";
import EditAdForm from "./crud/edit/EditAdForm";
import Catalog from "./crud/retrieve/Catalog";
import Delete from "./crud/delete/Delete";
import Details from "./crud/retrieve/Details";
import Cart from "./cart/Cart";
import Loading from "./loading/Loading";
import Orders from "./admin/Orders";

//Route with no path - used for not found pages.
const AppRouter = () => (
    <div>
        <Switch>
            <Route path="/orders" component={Orders}/>
            <Route path="/loading" component={Loading}/>
            <Route path="/account" component={Account}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/catalog" component={Catalog}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/register" component={RegisterForm}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/details/:id" component={Details}/>
            <Route path="/deleteAd/:id" component={Delete}/>
            <Route path="/editAd/:id" component={EditAdForm}/>
            <Route path="/createAd" component={CreateAdForm}/>
            <Route path="/faq" component={Faq}/>
            <Route path="/" component={Home}/>
        </Switch>
    </div>
);

export default AppRouter;