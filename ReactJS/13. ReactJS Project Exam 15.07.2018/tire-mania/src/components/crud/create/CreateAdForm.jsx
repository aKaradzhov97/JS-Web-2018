import React, {Component} from 'react';
import requester from "../../../utils/requester";
import notificator from "../../../utils/notificator";
import unauthorizedImg from '../../../images/unauthorized.png';

export default class CreateAdForm extends Component {
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
            picName: ''
        }
    }

    isAdmin = () => {
        if (sessionStorage.getItem('roleId') && sessionStorage.getItem('username') && sessionStorage.getItem('authtoken')) {
            return true;
        }
        return false;
    };

    handleChange = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;

        this.setState({
            [fieldName]: fieldValue
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        //Validation:
        if (this.state.brand === '') {
            notificator.showError('Моля попълнете полето за марка!');
            return;
        } else if (this.state.model === '') {
            notificator.showError('Моля попълнете полето за модел!');
            return;
        } else if (this.state.width === '') {
            notificator.showError('Моля попълнете полето за ширина!');
            return;
        } else if (this.state.height === '') {
            notificator.showError('Моля попълнете полето за височина!');
            return;
        } else if (this.state.diameter === '') {
            notificator.showError('Моля попълнете полето за диаметър!');
            return;
        } else if (this.state.season === '') {
            notificator.showError('Моля попълнете полето за сезон!');
            return;
        } else if (this.state.weightIndex === '') {
            notificator.showError('Моля попълнете полето за теглови индекс!');
            return;
        } else if (this.state.speedIndex === '') {
            notificator.showError('Моля попълнете полето за скоростен индекс!');
            return;
        } else if (this.state.price === '') {
            notificator.showError('Моля попълнете полето за цена!');
            return;
        } else if (this.state.picName === '') {
            notificator.showError('Моля попълнете полето за име на изображение!');
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
            picName: this.state.picName
        };
        //Now submit new ad to DB.
        requester.post('appdata', 'tires', 'kinvey', data)
            .then((res) => {
                notificator.showInfo('Успешно създадена обява!');
                this.props.history.push('/catalog');
            }).catch((res) => {
                notificator.showError(res.responseJSON.description);
            });
    };

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

        let authorized = (
            <section id="viewCreateAd" className="viewCreateAd">
                <h1 className="titleForm">Създай нова обява</h1>
                <form id="formCreateAd" className="form" onSubmit={this.handleSubmit}>
                    <div>Марка:</div>
                    <select id="listTireBrand" name="brand" onChange={this.handleChange} value={this.state.brand}>
                        <option value="" disabled >Избери..</option>
                        <option value="APOLLO">APOLLO</option>
                        <option value="AUSTONE">AUSTONE</option>
                        <option value="BARUM">BARUM</option>
                        <option value="BFGOODRICH">BFGOODRICH</option>
                        <option value="BRIDGESTONE">BRIDGESTONE</option>
                        <option value="CONTINENTAL">CONTINENTAL</option>
                        <option value="COOPER">COOPER</option>
                        <option value="DAYTON">DAYTON</option>
                        <option value="DEBICA">DEBICA</option>
                        <option value="DUNLOP">DUNLOP</option>
                        <option value="FIRESTONE">FIRESTONE</option>
                        <option value="FULDA">FULDA</option>
                        <option value="GOODYEAR">GOODYEAR</option>
                        <option value="KLEBER">KLEBER</option>
                        <option value="KORMORAN">KORMORAN</option>
                        <option value="KUMHO">KUMHO</option>
                        <option value="MICHELIN">MICHELIN</option>
                        <option value="NEXEN">NEXEN</option>
                        <option value="PIRELLI">PIRELLI</option>
                        <option value="RIKEN">RIKEN</option>
                        <option value="SPORTIVA">SPORTIVA</option>
                        <option value="TAURUS">TAURUS</option>
                        <option value="UNIROYAL">UNIROYAL</option>
                        <option value="VREDESTEIN">VREDESTEIN</option>
                    </select>
                    <div>Модел:</div>
                    <div><input type="text" onChange={this.handleChange} value={this.state.model} className="inputModel" name="model" /></div>
                    <div>Ширина:</div>
                    <select id="listTireWidth" onChange={this.handleChange} value={this.state.width} className="selectSize" name="width">
                        <option value="" disabled >Избери..</option>
                        <option value="135">135</option>
                        <option value="145">145</option>
                        <option value="155">155</option>
                        <option value="165">165</option>
                        <option value="175">175</option>
                        <option value="185">185</option>
                        <option value="195">195</option>
                        <option value="205">205</option>
                        <option value="215">215</option>
                        <option value="225">225</option>
                        <option value="235">235</option>
                        <option value="245">245</option>
                        <option value="255">255</option>
                        <option value="265">265</option>
                        <option value="275">275</option>
                        <option value="285">285</option>
                        <option value="295">295</option>
                        <option value="305">305</option>
                        <option value="315">315</option>
                        <option value="325">325</option>
                    </select>
                    <div>Височина:</div>
                    <select id="listAspectRatio" onChange={this.handleChange} value={this.state.height} name="height" className="selectSize">
                        <option value="" disabled >Избери..</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="55">55</option>
                        <option value="60">60</option>
                        <option value="65">65</option>
                        <option value="70">70</option>
                        <option value="75">75</option>
                        <option value="80">80</option>
                    </select>
                    <div>Диаметър:</div>
                    <select id="listDiameter" onChange={this.handleChange} value={this.state.diameter} name="diameter" className="selectSize">
                        <option value="" disabled >Избери..</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                    </select>
                    <div>Сезонност:</div>
                    <select id="listSeason" onChange={this.handleChange} value={this.state.season} name="season">
                        <option value="" disabled >Избери..</option>
                        <option value="&#9728;Летни">&#9728;Летни</option>
                        <option value="&#10052;Зимни">&#10052;Зимни</option>
                    </select>
                    <div>Теглови индекс:</div>
                    <select id="listWeightIndex" onChange={this.handleChange} value={this.state.weightIndex} name="weightIndex">
                        <option value="" disabled >Избери..</option>
                        <option value="70">70</option>
                        <option value="71">71</option>
                        <option value="72">72</option>
                        <option value="73">73</option>
                        <option value="74">74</option>
                        <option value="75">75</option>
                        <option value="76">76</option>
                        <option value="77">77</option>
                        <option value="78">78</option>
                        <option value="79">79</option>
                        <option value="80">80</option>
                        <option value="81">81</option>
                        <option value="82">82</option>
                        <option value="83">83</option>
                        <option value="84">84</option>
                        <option value="85">85</option>
                        <option value="86">86</option>
                        <option value="87">87</option>
                        <option value="88">88</option>
                        <option value="89">89</option>
                        <option value="90">90</option>
                        <option value="91">91</option>
                        <option value="92">92</option>
                        <option value="93">93</option>
                        <option value="94">94</option>
                        <option value="95">95</option>
                        <option value="96">96</option>
                        <option value="97">97</option>
                        <option value="98">98</option>
                        <option value="99">99</option>
                        <option value="100">100</option>
                        <option value="102">102</option>
                        <option value="106">106</option>
                        <option value="107">107</option>
                        <option value="108">108</option>
                        <option value="109">109</option>
                        <option value="112">112</option>
                        <option value="114">114</option>
                    </select>
                    <div>Скоростен индекс:</div>
                    <select id="listSpeedIndex" onChange={this.handleChange} value={this.state.speedIndex} name="speedIndex">
                        <option value="" disabled >Избери..</option>
                        <option value="N">N</option>
                        <option value="P">P</option>
                        <option value="Q">Q</option>
                        <option value="R">R</option>
                        <option value="S">S</option>
                        <option value="T">T</option>
                        <option value="U">U</option>
                        <option value="H">H</option>
                        <option value="V">V</option>
                        <option value="W">W</option>
                        <option value="Y">Y</option>
                        <option value="ZR">ZR</option>
                    </select>
                    <div>Цена:</div>
                    <div><input type="number" onChange={this.handleChange} value={this.state.price} className="inputPrice" step="0.01" name="price" /></div>
                    <div>Име на изображение + разширение:</div>
                    <div><input type="text" onChange={this.handleChange} value={this.state.picName} className="inputModel" name="picName" /></div>
                    <div><input type="submit" id="buttonCreateAd" value="Създай!" /></div>
                </form>
            </section>
        );

        return (
            <main>
                {this.isAdmin() ? authorized : unauthorized}
            </main>
        )
    }
}