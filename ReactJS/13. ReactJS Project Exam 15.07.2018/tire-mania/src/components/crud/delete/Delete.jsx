import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import requester from '../../../utils/requester';
import notificator from '../../../utils/notificator';

export default class Delete extends Component {
    deleteAdById = () => {
        let tireId = this.props.match.params.id;
        const ENDPOINT = `tires/${tireId}`;

        return requester.remove('appdata', ENDPOINT, 'kinvey');
    };

    isAdmin = () => {
        if (sessionStorage.getItem('roleId') && sessionStorage.getItem('username') && sessionStorage.getItem('authtoken')) {
            return true;
        }
        return false;
    };

    componentDidMount = () => {
        if (this.isAdmin()) {
            this.deleteAdById()
                .then((res) => {
                    notificator.showInfo('Успешно изтрихте обявата!');
                    localStorage.setItem('endpoint', '/catalog');
                    this.props.history.push('/loading');
                })
                .catch((res) => {
                    notificator.showError(res.responseJSON.description);
                });
        } else {
            notificator.showError('Нямате право да извършите операцията!');
        }
        
    };
    render = () => {
        return (
            <Redirect to="/catalog"/>
        )
    }
}