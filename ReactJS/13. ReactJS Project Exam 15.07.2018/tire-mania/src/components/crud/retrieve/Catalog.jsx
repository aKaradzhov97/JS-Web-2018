import React, { Component } from 'react';
import requester from '../../../utils/requester';
import AdminTire from "./product/AdminTire";
import Tire from './product/Tire';
import unauthorizedImg from '../../../images/unauthorized.png';

export default class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tires: []
        }
    }

    isAdmin = () => {
        if (sessionStorage.getItem('roleId') && sessionStorage.getItem('username') && sessionStorage.getItem('authtoken')) {
            return true;
        }
        return false;
    };

    isLogged = () => {
        if (sessionStorage.getItem('authtoken') && sessionStorage.getItem('userId') && sessionStorage.getItem('username')) {
            return true;
        }
        return false;
    };

    getTires = () => {
        requester.get('appdata', 'tires', 'kinvey')
            .then(res => {
                this.setState({tires: res});
            });
    };

    componentDidMount = () => {
        this.getTires();
    };

    render = () => {
        let unauthorized = (
            <section id="viewAds" className="viewAds">
                <h1 className="titleForm">Хитруваме, а?</h1>
                <div id="ads" className="ads">
                    <div className="noProductsPage">
                        <h2 className="body-text">Моля влезте в акаунта си или се регистрирайте, за да разгледате обявите!</h2>
                        <img src={unauthorizedImg} title="Нямате права!" alt="No products.." />
                    </div>
                </div>
            </section>
        );

        return (
            <main>
                <section id="viewAds" className="viewAds">
                    <h1 className="titleForm">Продукти:</h1>
                    <div id="ads" className="ads">

                        <ul>
                            {
                                (!this.isLogged())
                                ? unauthorized
                                : this.isAdmin()
                                ? (this.state.tires.map((t) => <AdminTire key={t._id} {...t} />))
                                : (this.state.tires.map((t) => <Tire key={t._id} {...t} />))
                            }
                        </ul>
                    </div>
                </section>
            </main>
        )
    }
}