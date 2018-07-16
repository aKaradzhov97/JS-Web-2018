import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

const rerender  = ReactDOM.render;

ReactDOM.render(App(), document.getElementById('root'));
export default rerender;