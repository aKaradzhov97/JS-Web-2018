import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Tire extends Component {
    render = () => {
        return (
            <Link to={"/details/" + this.props._id}>
                <li>
                    <div className="productBrand">{this.props.brand}</div>
                    <div className="productModel">{this.props.model}</div>
                    <div className="productPicture"><img src={this.props.picName} alt="Product" height="180" /></div>
                    <div className="productSize">{this.props.width}/{this.props.height} R{this.props.diameter}</div>
                    <div className="productInfo">{this.props.season} {this.props.weightIndex}{this.props.speedIndex}</div>
                    <div className="productPrice">{this.props.price}лв.</div>
                </li>
            </Link>
        )
    }
}