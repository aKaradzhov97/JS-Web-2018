import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import requester from '../../utils/requester';
import notificator from "../../utils/notificator";

export default class Logout extends Component {
    logout = () => {
        requester.post('user', '_logout', 'kinvey')
            .then(res => {
                sessionStorage.removeItem('authtoken');
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('userId');
                if (sessionStorage.getItem('roleId')) {
                    sessionStorage.removeItem('roleId');
                }
                localStorage.clear();
                notificator.showInfo('Излязохте успешно!');
                this.props.history.push('/');

            }).catch((res) => {
                notificator.showError(res.responseJSON.description);
            });
    };

    render = () => {
        this.logout();
        return (
            <Redirect to='/' />
        )
    }
}