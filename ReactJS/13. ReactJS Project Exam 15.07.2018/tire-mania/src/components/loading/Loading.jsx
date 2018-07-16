import React, { Component } from 'react';

//Loading image import:
import loadingImg from '../../images/Loading.svg';

export default class Loading extends Component {
    componentDidMount() {
        setTimeout(() => {
            let endpoint = localStorage.getItem('endpoint');
            this.props.history.push(endpoint);
            localStorage.removeItem('endpoint');
            localStorage.removeItem('message');
        }, 1300);
    }
    render = () => {
        return (
            <main>
                <section id="viewAds" className="viewAds">
                    <h1 className="titleForm">Вашата количка:</h1>
                    <div id="ads" className="cartAds">
                        <div className="noProductsPage">
                            <h2>{localStorage.getItem('message')}</h2>
                            <h2>Моля, изчакайте..!</h2>
                            <img src={loadingImg} alt="Loading.."/>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}