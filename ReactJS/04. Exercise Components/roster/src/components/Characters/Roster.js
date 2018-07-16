import React from 'react';

export default class Roster extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const images = this.props.images.map(i => (
            <img src={i.url} alt="Image load error check Roster.js" key={i.id} onClick={() => this.props.get(i.id)}/>
        ));
        return (
            <section id="roster">
                {images}
            </section>
        )
    }
}