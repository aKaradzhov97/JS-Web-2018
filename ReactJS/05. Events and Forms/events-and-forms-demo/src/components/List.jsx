import React, { Component } from 'react';

class List extends Component {

    render () {
        let items = this.props.items || [];
        return (
            <ul>
                {items.map(i => <li key={i._id}>{i.name}</li>)}
            </ul>
        )
    }
}

export default List;