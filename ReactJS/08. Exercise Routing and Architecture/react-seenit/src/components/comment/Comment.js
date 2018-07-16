import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import calcTime from '../../infrastructure/timeCalculator'

export default class Comment extends Component {
    render() {
        return (
            <article className="comment">
                <div className="comment-content">
                    <div>
                        {this.props.content}
                    </div>
                    <div className="info">
                        submitted {calcTime(this.props._kmd.ect)} ago by {this.props.author}
                    </div>
                    <div className="controls">
                        <Link to={'/comment/delete/' + this.props._id} className="deleteComment">Delete</Link>
                    </div>
                </div>
            </article>
        )
    }
}