import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Footer extends Component {
    render = () => {
        return (
            <footer>
                <div className="row">
                    <div className="column" id="leftColumn">
                        <Link to="/termsAndConditions">Общи условия</Link>
                        <Link to="/faq">Често задавани въпроси</Link>
                    </div>
                    <div className="column" id="rightColumn">
                        <Link to="/aboutUs">За нас</Link>
                        <Link to="/contacts">Контакти</Link>
                    </div>
                </div>
            </footer>
        )
    }
}