import React, { Component } from 'react'
import CommentForm from '../comment/CommentForm'
import CommentsList from '../comment/CommentsList'
import Details from './Details'
import requester from '../../infrastructure/requester'
import '../../styles/post.css'

export default class PostDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.updateView = this.updateView.bind(this)
    }

    componentDidMount() {
        let query = 'posts/?query=' + JSON.stringify({ _id: this.props.match.params.id })
        requester.get('appdata', query, 'kinvey')
            .then(res => {
                const post = res[0]
                this.setState({ post })
            })

    }

    updateView() {
        let query = 'posts/?query=' + JSON.stringify({ _id: this.props.match.params.id })
        requester.get('appdata', query, 'kinvey')
            .then(res => {
                const post = res[0]
                this.setState({ post })
            })
    }


    render() {
        if (!this.state.post) {
            return <div>Loading...</div>
        }
        return (
            <section id="viewPostDetails">
                <Details {...this.state.post} />
                <CommentForm updateView={this.updateView} postId={this.state.post._id} />
                <CommentsList postId={this.state.post._id} />
            </section>
        )
    }
}