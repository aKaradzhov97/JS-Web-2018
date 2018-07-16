import React from 'react';

const AllCatFood = (props) => (
    <div>
        <h1>All available cat food.</h1>
        <h2>Access url parameter - example: foodID - {props.match.params.foodId}</h2>
    </div>
)

export default AllCatFood;