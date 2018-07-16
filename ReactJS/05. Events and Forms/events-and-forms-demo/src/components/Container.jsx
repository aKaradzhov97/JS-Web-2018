import React, { Component } from 'react';
import List from "./List";
import ItemForm from "./ItemForm";

class Container extends Component {
    constructor (props) {
        super(props);

        this.state = {
            items: []
        }
    }

    addItem = (name) => {
        this.setState(prevState => {
            let items = prevState.items;

            items.push({
                _id: items.length + 1,
                name
            });

            return {
                items
            }
        })
    }

    render () {
        return (
            <div>
                <h1>My React Page</h1>
                <List items={this.state.items} />
                <ItemForm addItem={this.addItem}/>
            </div>
        )
    }
}

export default Container;