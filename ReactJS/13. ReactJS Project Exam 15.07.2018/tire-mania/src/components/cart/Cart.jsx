import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import noProductsInCartImg from '../../images/noProducts.png';
import requester from '../../utils/requester';
import notificator from '../../utils/notificator';

export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            orderPrice: '0',
            cart: JSON.parse(localStorage.getItem('cart'))
        }
    }

    handleOrderPrice = () => {
        let orderPrice = 0;
        for (let i = 0; i < this.state.cart.length; i++) {
            let tire = this.state.cart[i];
            orderPrice += Number(tire.totalPrice);
        }
        localStorage.setItem('orderPrice', orderPrice);
        return orderPrice;
    };

    cartIsNotEmpty = () => {
        if (this.state.cart && this.state.cart.length > 0) {
            return true;
        }
        return false;
    };

    //Product handling.
    handleRemoveItemFromCart = (event) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let elementToBeRemoved = event.target.attributes.getNamedItem('data-id').value;

        for (let i = 0; i < cart.length; i++) {
            let currentElementId = cart[i]._id;
            if (currentElementId === elementToBeRemoved) {
                cart.splice(i, 1);
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        localStorage.setItem('endpoint', '/cart');
        localStorage.setItem('message', 'Премахване на продукт от количката..');

        if (JSON.parse(localStorage.getItem('cart')).length === 0) {
            localStorage.removeItem('cart');
            localStorage.removeItem('orderPrice');
        }
        this.props.history.push('/loading');
        notificator.showInfo('Успешно премахнахте продукта от количката!');
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let orderPriceValue = localStorage.getItem('orderPrice');
        let username = sessionStorage.getItem('username');

        let data = this.state;

        data.orderPrice = orderPriceValue;
        data.username = username;

        requester.post('appdata', 'orders', 'kinvey', data)
            .then((res) => {
                notificator.showInfo('Успешно потвърдихте поръчката си! Очаквайте да се свържем с Вас!');
                localStorage.setItem('endpoint', '/');
                localStorage.setItem('message', 'Обработваме поръчката Ви!');
                this.props.history.push('/loading');
                localStorage.removeItem('cart');
                localStorage.removeItem('orderPrice');
            }).catch((res) => {
                notificator.showError(res.responseJSON.description);
            });
    };

    render = () => {
        const noProductsInCart = (
            <div className="noProductsPage">
                <h2>Нямате добавени продукти в количката!</h2>
                <img src={noProductsInCartImg} title="Няма продукти!" alt="No products in cart."/>
            </div>
        );

        return (
            <main>
                <section id="viewAds" className="viewAds">
                    <h1 className="titleForm">Вашата количка:</h1>
                    <div id="ads" className="cartAds">
                        {this.cartIsNotEmpty()
                            ? (
                                <ul>
                                    {this.state.cart.map(t => (
                                        <li key={t._id}>
                                            <div className="productActions"><button onClick={this.handleRemoveItemFromCart} className="deleteLink" data-id={t._id} title="Изтрий!">&#10006;</button></div>
                                            <Link to={"/details/" + t._id}>
                                                <div className="productPicture"><img src={t.picName} alt="Product in cart." height="180" /></div>
                                                <div className="productBrand">{t.brand}</div>
                                                <div className="productModel">{t.model}</div>
                                                <div className="productSize">{t.width}/{t.height} R{t.diameter}</div>
                                                <div className="productInfo">{t.season} {t.weightIndex}{t.speedIndex}</div>
                                                <div className="productCount">Брой: {t.count}</div>
                                                <div className="productPrice">Общо: {t.totalPrice}лв.</div>
                                            </Link>
                                        </li>
                                    ))}
                                    <div id="totalPrice" className="submitOrderForm">Крайна цена: {this.handleOrderPrice()}лв.
                                        <form onSubmit={this.handleSubmit}>
                                            <input type="submit" className="buyButton" value="Поръчай!"/>
                                        </form>
                                    </div>
                                </ul>
                            )
                            : noProductsInCart}
                    </div>
                </section>
            </main>
        )
    }
}