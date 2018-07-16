import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import calcTime from '../../infrastructure/timeCalculator'
import '../../styles/post.css'

export default class Details extends Component {
    render() {
        return (
            <article className="post">
                <div className="col thumbnail">
                    <a href={this.props.url}>
                        <img src={this.props.imageUrl} alt="Not found" />
                    </a>
                </div>
                <div className="post-content">
                    <div className="title">
                        <a href={this.props.url}>
                            {this.props.title}
                        </a>
                    </div>
                    <div className="details">
                        <div className="info">
                            submitted {calcTime(this.props._kmd.ect)} ago by {this.props.author}
                        </div>
                        <div className="controls">
                            <ul>
                                <li className="action">
                                    <Link to={'/post/edit/' + this.props._id} className="editPost">Edit</Link>
                                </li>
                                <li className="action">
                                    <Link to={'/post/delete/' + this.props._id} className="deletePost">Delete</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}