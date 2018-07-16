import React, { Component } from 'react'
import requester from '../../infrastructure/requester'
import Comment from './Comment'
import '../../styles/comment.css'

export default class CommentsList extends Component {
    constructor(props) {
        super(props)

        this.state = { comments: [] }
    }

    getComments = () => {
        let query = 'comments/?query=' + JSON.stringify({ postId: this.props.postId })
        requester.get('appdata', query, 'kinvey')
            .then(res => {
                this.setState({ comments: res })
            })
    }

    componentDidMount() {
        this.getComments();
    }

    render() {
        if (!this.state.comments) {
            return <div>Loading...</div>
        }
        return (
            <div id="allComments" className="comments">
                {this.state.comments.map(c => <Comment key={c._id}  {...c} />)}
            </div>
        )
    }
}