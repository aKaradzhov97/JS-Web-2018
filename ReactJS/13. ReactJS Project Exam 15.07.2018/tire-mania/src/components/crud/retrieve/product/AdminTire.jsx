import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class AdminTire extends Component {
    render = () => {
        let editEndpoint = `/editAd/${this.props._id}`;
        let deleteEndpoint = `/deleteAd/${this.props._id}`;

        return (
            <li>
                <div className="productActions"><Link to={editEndpoint}><button className="editLink">&#9998;</button></Link></div>
                <div className="productActions"><Link to={deleteEndpoint}><button className="deleteLink">&#10006;</button></Link></div>
                <Link to={"/details/" + this.props._id}>
                    <div className="productBrand">{this.props.brand}</div>
                    <div className="productModel">{this.props.model}</div>
                    <div className="productPicture"><img src={this.props.picName} height="180" alt="Product" /></div>
                    <div className="productSize">{this.props.width}/{this.props.height} R{this.props.diameter}</div>
                    <div className="productInfo">{this.props.season} {this.props.weightIndex}{this.props.speedIndex}</div>
                    <div className="productPrice">{this.props.price}лв.</div>
                </Link>
            </li>
        )
    }
}