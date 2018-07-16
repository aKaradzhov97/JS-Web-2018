import React, { Component } from 'react';

export default class SingleProduct extends Component {
    render = () => {
        return (
            <table className="singleProductTable">
                <tbody>
                <tr>
                    <td id="productNum" className="productDetail">Продукт номер</td>
                    <td id="productNumValue">
                        {this.props.index + 1}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Марка</td>
                    <td>
                        {this.props.brand}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Модел</td>
                    <td>
                        {this.props.model}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Размер</td>
                    <td>
                        {this.props.width}/{this.props.height} R{this.props.diameter}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Сезонност</td>
                    <td>
                        {this.props.season}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Теглови индекс</td>
                    <td>
                        {this.props.weightIndex}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Скоростен индекс</td>
                    <td>
                        {this.props.speedIndex}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Брой</td>
                    <td>
                        {this.props.count}
                    </td>
                </tr>
                <tr>
                    <td className="productDetail">Цена</td>
                    <td>
                        {this.props.totalPrice}
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}