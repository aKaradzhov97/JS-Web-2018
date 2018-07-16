import React, { Component } from 'react';
import requester from '../../utils/requester';
import notificator from '../../utils/notificator';
import { Link } from 'react-router-dom';
import SingleProduct from './SingleProduct';

export default class SingleOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userDetails: {}
        }
    }

    handleDeleteOrder = (event) => {
        let orderId = event.target.getAttribute('data-orderid');

        const ENDPOINT = `orders/${orderId}`;

        requester.remove('appdata', ENDPOINT, 'kinvey')
            .then((res) => {
                localStorage.setItem('endpoint', '/orders');
                localStorage.setItem('message', 'Обработва се...');
                notificator.showInfo('Успешно изтрихте поръчката!');
            }).catch((res) => {
                notificator.showError(res);
            });
    };

    handleCheckOutOrder = (event) => {
        let orderId = event.target.getAttribute('data-orderid');
        let userId = event.target.getAttribute('data-userid');

        let data = {
            user: {},
            order: {}
        };
        requester.get('user', userId, 'kinvey')
            .then((res) => {
                data['user'] = res;

                const ENDPOINT = `orders/${orderId}`;
                requester.get('appdata', ENDPOINT, 'kinvey')
                    .then((res) => {
                        data['order'] = res;

                        const ENDPOINT = `orders/${orderId}`;
                        requester.remove('appdata', ENDPOINT, 'kinvey')
                            .then((res) => {
                                requester.post('appdata', 'ordersArchive', 'kinvey', data)
                                    .then((res) => {
                                        notificator.showInfo('Успешно потвърдихте поръчката! Запазена е в архива!');
                                        localStorage.setItem('message', 'Обработваме данните..');
                                        localStorage.setItem('endpoint', '/orders');
                                    })
                                    .catch((res) => {
                                        notificator.showError('Неуспешно потвърждение на поръчка!');
                                    })
                            })
                            .catch((res) => {
                                notificator.showError('Неуспешно премахване на информация за поръчка!');
                            })
                    })
                    .catch((res) => {
                        notificator.showError('Неуспешно вземане на информация за поръчка!');
                    })
            })
            .catch((res) => {
                notificator.showError('Неуспешно вземане на информация за потребител!');
            });
    };

    getUserById = () => {
        const userId = this.props._acl.creator;

        requester.get('user', userId, 'kinvey')
            .then((res) => {
                this.setState({
                    userDetails: res
                });
            }).catch((res) => {
                notificator.showError('Грешка!');
            });
    };

    componentDidMount() {
        this.getUserById();
    }

    render = () => {
        let userInfoTable = (
            <table className="userInfoTable">
                <tbody>
                <tr>
                    <td id="productNum" className="productDetail">Потребител ID</td>
                    <td id="productNumValue">
                        {this.props._acl.creator}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Име</td>
                    <td>
                        {this.state.userDetails.name}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Фамилия</td>
                    <td>
                        {this.state.userDetails.surname}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Телефон</td>
                    <td>
                        {this.state.userDetails.phone}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Email</td>
                    <td>
                        {this.state.userDetails.email}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Град</td>
                    <td>
                        {this.state.userDetails.city}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Квартал</td>
                    <td>
                        {this.state.userDetails.quarter}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Улица</td>
                    <td>
                        {this.state.userDetails.street}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Пощенски код</td>
                    <td>
                        {this.state.userDetails.postCode}
                    </td>
                </tr>
                </tbody>
            </table>
        );

        return (
            <table>
                <thead>
                <tr>
                    <th colSpan="3">Детайли за поръчка номер: {this.props._id}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="productDetail">Потребител</td>
                    <td>
                        {this.props.username}
                    </td>
                </tr>
                <tr>
                    <td>
                        {this.props.cart.map((product, index) => <SingleProduct key={product._id} index={index} {...product} />)}
                    </td>
                    <td>
                        {userInfoTable}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">КРАЙНА ЦЕНА</td>
                    <td className="totalOrderPrice">
                        {this.props.orderPrice} ЛВ.
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Действия</td>
                    <td className="totalOrderPrice">
                        <div className="productActions"><Link to="/loading"><button onClick={this.handleCheckOutOrder} id="checkoutOrderBtn" className="editLink" data-orderid={this.props._id} data-userid={this.props._acl.creator} title="Потвърди поръчката!">&#10004;</button></Link></div>
                        <div className="productActions"><Link to="/loading"><button onClick={this.handleDeleteOrder} id="deleteOrderBtn" className="deleteLink" data-orderid={this.props._id} title="Изтрий поръчката!">&#10006;</button></Link></div>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}