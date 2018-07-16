import React from 'react';
import { Route, Link } from 'react-router-dom';

//Example for nested Routing here >>>
const Home = (props) => (
    <h1>
        Welcome to my app!
        <Link to="/home/contact">Link to nested route.</Link>
        <Route path={props.match.url + '/contact'} render={() => (
            <div>
                <h2>Contacts: blabla</h2>
                <h2>Nested route here: {props.match.url + '/contact'}</h2>
            </div>
            )} />
    </h1>
);

export default Home;