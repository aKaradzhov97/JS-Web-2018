import React, { Component } from 'react';
import requester from '../../../utils/requester';
import notificator from '../../../utils/notificator';
import ReactTouchEvents from 'react-touch-events';

export default class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            brand: '',
            model: '',
            width: '',
            height: '',
            diameter: '',
            season: '',
            weightIndex: '',
            speedIndex: '',
            price: '',
            picName: '',
            count: '',
            totalPrice: '0',
            _id: ''
        }
    }

    getAdById = () => {
        let tireId = this.props.match.params.id;
        const ENDPOINT = `tires/${tireId}`;

        return requester.get('appdata', ENDPOINT, 'kinvey');
    };

    handleChange = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;

        this.setState({
            [fieldName]: fieldValue
        });
    };

    handleTotalPriceValue = () => {
        const tireCount = Number(this.state.count);
        const singleTirePrice = Number(this.state.price);
        let totalPriceValue = singleTirePrice * tireCount;

        this.setState({
            totalPrice: totalPriceValue
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        //Validation:
        if (this.state.count === '') {
            notificator.showError('Моля изберете брой гуми!');
            return;
        }
        //End of validation!

        let data = {
            brand: this.state.brand,
            model: this.state.model,
            width: this.state.width,
            height: this.state.height,
            diameter: this.state.diameter,
            season: this.state.season,
            weightIndex: this.state.weightIndex,
            speedIndex: this.state.speedIndex,
            price: this.state.price,
            picName: this.state.picName,
            count: this.state.count,
            totalPrice: this.state.totalPrice,
            _id: this.state._id
        };
        //Now submit new ad to DB.

        let cart = localStorage.getItem('cart');

        let duplicateProduct = false;
        if (!cart) {
            cart = [];
            cart.push(data);
        } else {
            cart = JSON.parse(localStorage.getItem('cart'));
            for (let i = 0; i < cart.length; i++) {
                let currentItem = cart[i];
                if (currentItem._id === data._id) {
                    duplicateProduct = true;
                }
            }
            if (!duplicateProduct) {
                cart.push(data);
            }
        }
        if (!duplicateProduct) {
            localStorage.setItem('cart', JSON.stringify(cart));
            notificator.showInfo('Успешно добавихте продукта в количката!');
            this.props.history.push('/catalog');
        } else {
            notificator.showError('Неуспешно добавяне! Във вашата количка вече има такъв продукт!');
        }

    };

    componentDidMount = () => {
        //Do when component is rendered...
        this.getAdById().then((res) => {
            this.setState({
                brand: res.brand,
                model: res.model,
                width: res.width,
                height: res.height,
                diameter: res.diameter,
                season: res.season,
                weightIndex: res.weightIndex,
                speedIndex: res.speedIndex,
                price: res.price,
                picName: res.picName,
                _id: res._id
            });
        });
    };

    render = () => {
        return (
            <main>
                <section id="viewAds" className="viewAds">
                    <h1 className="titleForm">Детайли за продукт:</h1>
                    <div id="ads" className="ads">

                        <div className="imageSlot">
                            <img src={this.state.picName} alt="Product." width="50%" height="50%" />
                        </div>

                        <table>
                            <thead>
                            <tr>
                                <th colSpan="3">Детайли за гумата:</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="productDetail">Марка</td>
                                <td>
                                    {this.state.brand}
                                </td>
                            </tr>
                            <tr>
                                <td className="productDetail">Модел</td>
                                <td>
                                    {this.state.model}
                                </td>
                            </tr>
                            <tr>
                                <td className="productDetail">Размер</td>
                                <td>
                                    {this.state.width}/{this.state.height} R{this.state.diameter}
                                </td>
                            </tr>
                            <tr>
                                <td className="productDetail">Сезонност</td>
                                <td>
                                    {this.state.season}
                                </td>
                            </tr>
                            <tr>
                                <td className="productDetail">Теглови индекс</td>
                                <td>
                                    {this.state.weightIndex}
                                </td>
                            </tr>
                            <tr>
                                <td className="productDetail">Скоростен индекс</td>
                                <td>
                                    {this.state.speedIndex}
                                </td>
                            </tr>
                            <tr>
                                <td className="productDetail">Цена за брой</td>
                                <td>
                                    {Number(this.state.price).toFixed(2)}лв.
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <div id="totalPrice" className="submitOrderForm">
                            <form onSubmit={this.handleSubmit} id="addToCartForm">
                                <h3 className="totalPrice">Брой гуми:</h3>
                                <ReactTouchEvents onTap={this.handleTotalPriceValue} >
                                    <select className="selectTireCount" id="tireCount" name="count" onChange={this.handleChange} value={this.state.count}>
                                        <option value="" disabled>Избери..</option>
                                        <option onClick={this.handleTotalPriceValue} value="1">1</option>
                                        <option onClick={this.handleTotalPriceValue} value="2">2</option>
                                        <option onClick={this.handleTotalPriceValue} value="3">3</option>
                                        <option onClick={this.handleTotalPriceValue} value="4">4</option>
                                        <option onClick={this.handleTotalPriceValue} value="5">5</option>
                                        <option onClick={this.handleTotalPriceValue} value="6">6</option>
                                        <option onClick={this.handleTotalPriceValue} value="7">7</option>
                                        <option onClick={this.handleTotalPriceValue} value="8">8</option>
                                    </select>
                                </ReactTouchEvents>
                                <h3 className="totalPrice">Крайна цена: {(Number(this.state.count) * Number(this.state.price)).toFixed(2)}лв.</h3>
                                <input type="submit" id="buttonAddToCart" value="Добави в количката!" />
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}