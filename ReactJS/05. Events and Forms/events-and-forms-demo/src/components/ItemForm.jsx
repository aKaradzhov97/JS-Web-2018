import React, { Component } from 'react';


class ItemForm extends Component {
    constructor (props) {
        super(props);

        this.state = {
            itemName: '',
            error: ''
        };
    };

    onInputChanged = (event) => {
        this.setState({
            itemName: event.target.value
        });
    };

    onItemSaved = (event) => {
        event.preventDefault();

        if (!this.state.itemName) {
            this.setState({
                error: 'Item name cannot be empty!'
            });
            return;
            
        } else {
            this.setState({
                error: ''
            });
        }

        this.props.addItem(this.state.itemName);
    };

    render () {
        return (
            <div>
            <span>
                {this.state.error}
            </span>
                <form onSubmit={this.onItemSaved}>
                    Item name:
                    <input
                        type="text"
                        name="name"
                        onChange={this.onInputChanged}
                    />
                    <br/>
                    <input
                        type="submit"
                        value="Add to list!"
                    />
                </form>
            </div>
        )
    }
}

export default ItemForm;