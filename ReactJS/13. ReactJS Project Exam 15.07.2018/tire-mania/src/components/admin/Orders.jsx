import React, { Component } from 'react';
import requester from '../../utils/requester';
import notificator from '../../utils/notificator';
import SingleOrder from './SingleOrder';
import unauthorizedImg from '../../images/unauthorized.png';

export default class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: []
        }
    }

    isAdmin = () => {
        if (sessionStorage.getItem('roleId') && sessionStorage.getItem('username') && sessionStorage.getItem('authtoken')) {
            return true;
        }
        return false;
    };

    noOrders = () => {
        if (this.state.orders.length === 0) {
            return true;
        }
        return false;
    };

    getAllOrders = () => {
        const ENDPOINT = 'orders';
        return requester.get('appdata', ENDPOINT, 'kinvey');
    };

    componentDidMount() {
        if (!this.isAdmin()) {
            notificator.showError('Нямате права да извършвате операции тук!');
            return;
        }
        this.getAllOrders()
            .then((res) => {
                this.setState({
                    orders: res
                });
                notificator.showInfo('Поръчките са заредени успешно!');
            }).catch((res) => {
                notificator.showError('Неуспешно зареждане на поръчките!');
            });
    }

    render = () => {
        let unauthorized = (
            <section id="viewAds" className="viewAds">
                <h1 className="titleForm">Хитруваме, а?</h1>
                <div id="ads" className="ads">
                    <div className="noProductsPage">
                        <h2>Нямате права, за да видите тази страница!</h2>
                        <img src={unauthorizedImg} title="Нямате права!" alt="No products.." />
                    </div>
                </div>
            </section>
        );

        let noOrdersSection = (
            <div>
                <h1 className="titleForm">Поръчки:</h1>
                <div id="ads" className="ads">
                    <div className="noProductsPage">
                        <h2>В момента няма никакви поръчки!</h2>
                        <img src={unauthorizedImg} title="Нямате права!" alt="No products.." />
                    </div>
                </div>
            </div>
        );

        return (
            <main>
                <section id="viewAds" className="viewAds">
                    <h1 className="titleForm">Поръчки:</h1>
                    <div id="ads" className="ads">

                        {
                            !this.isAdmin()
                                ? unauthorized
                                : this.noOrders()
                                ? noOrdersSection
                                : (this.state.orders.map((order) => <SingleOrder key={order._id} {...order} />))
                        }

                    </div>
                </section>
            </main>
        )
    }
}