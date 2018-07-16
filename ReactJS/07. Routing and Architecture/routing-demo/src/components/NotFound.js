import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div>
        <h1>404</h1><h3>Page Not Found!</h3>
        <Link to="/home">Go back to Home page!</Link>
    </div>
);

export default NotFound;