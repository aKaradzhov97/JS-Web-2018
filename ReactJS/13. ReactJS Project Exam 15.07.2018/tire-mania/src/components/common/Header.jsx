import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../../styles/site.css';

export default class Header extends Component {
    isAdmin = () => {
        if (sessionStorage.getItem('roleId') && sessionStorage.getItem('username') && sessionStorage.getItem('authtoken')) {
            return true;
        }
        return false;
    };

    cartItems = () => {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
        return 0;
    };

    isLogged = () => {
        if (sessionStorage.getItem('username') && sessionStorage.getItem('authtoken')) {
            return true;
        }
        return false;
    };

    render = () => {
        const guestSection = (
            <ul className="topnav">
                <li><Link to="/" id="linkHome" className="menu-item" >Главна страница</Link></li>
                <li><Link to="/login" id="linkLogin" className="menu-item">Вход</Link></li>
                <li><Link to="/register" id="linkRegister" className="menu-item">Регистрация</Link></li>
            </ul>
        );

        const loggedInSection = (
            <ul className="topnav">
                <li><Link to="/" id="linkHome" className="menu-item" >Главна страница</Link></li>
                <li><Link to="/catalog" id="linkListAds" className="menu-item">Обяви гуми</Link></li>
                <li><Link to="/account" id="linkAccount" className="menu-item"><span id="loggedInUser">Добре дошъл {sessionStorage.getItem('username')}!</span></Link></li>
                <li><Link to="/cart" id="linkCart" className="menu-item">Количка ({this.cartItems()})</Link></li>
                <li><Link to="/logout" id="linkLogout" className="menu-item">Изход</Link></li>
            </ul>
        );

        return (
            <header id="menu" className="menu">
                {this.isLogged() ? loggedInSection : guestSection}
            </header>
        )
    }
}