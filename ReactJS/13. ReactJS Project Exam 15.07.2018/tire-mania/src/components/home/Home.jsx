import React, {Component} from 'react';
import '../../styles/slideshow.css';
import slideshow from '../../utils/slideshow';

export default class Home extends Component {
    componentDidMount = () => {
        slideshow.appendSlider();
    };

    isLogged = () => {
        if (sessionStorage.getItem('username') && sessionStorage.getItem('authtoken')) {
            return true;
        }
        return false;
    };

    render = () => {
        return (
            <main>
                <section id="viewHome" className="viewHome">
                    {
                        !this.isLogged()
                        ? <h2 className="body-text">Моля влезте в акаунта си или се регистрирайте, за да разгледате обявите!</h2>
                        : null
                    }

                    <p className="body-text">Tire MANIA 2018</p>
                    <p className="body-text">Онлайн магазин за автомобилни гуми.</p>
                    <div id="slideshowArea">

                    </div>
                </section>
            </main>
        )
    }
}