import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
    <div className="App-header">
        <Link to="/home">Home</Link>
        <Link to="/add">Add cat food</Link>
        <Link to="/all">All cat food</Link>
        <Link to="/all/150">Cat food with ID</Link>
    </div>
)

export default Navigation;