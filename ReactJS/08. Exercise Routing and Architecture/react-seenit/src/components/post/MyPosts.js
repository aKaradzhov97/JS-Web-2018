import React, { Component } from 'react'
import requester from '../../infrastructure/requester'
import Post from './Post'

export default class MyPosts extends Component {
    constructor(props) {
        super(props)

        this.state = { posts: [] }
    }

    getPosts = () => {
        let username = sessionStorage.getItem('username')
        let query = 'posts/?query=' + JSON.stringify({ author: username })
        requester.get('appdata', query, 'kinvey')
            .then(res => {
                this.setState({ posts: res })
            })
    }

    componentDidMount() {
        this.getPosts();
    }

    render() {
        return (
            <section id="viewCatalog">
                <div id="allForumPosts" className="posts">
                    {this.state.posts.map((p, i) => <Post key={p._id} index={i} {...p} />)}
                </div>
            </section>
        )
    }
}