import React, {Component} from 'react';
import withLogging from '../helpers/withLogging';

class HomeBase extends Component {
    static displayName = 'Home';

    render () {
        return (
            <div>
                Home
            </div>
        )
    }
}

const Home = withLogging(HomeBase);

export default Home;
