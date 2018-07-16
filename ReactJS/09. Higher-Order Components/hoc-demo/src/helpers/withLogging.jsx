import React, {Component} from 'react';

const withLogging = WrappedComponent =>
    class extends Component {
        componentDidMount () {
            console.log(`${WrappedComponent.name} ready!`);
        }

        render () {
            return <WrappedComponent />
        }
    }

export default withLogging;