import React, { Component } from 'react'
import requester from '../../infrastructure/requester'
import '../../styles/comment.css'

export default class CommentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    handleChange(e) {
        let fieldName = e.target.name
        let fieldValue = e.target.value

        this.setState({ [fieldName]: fieldValue })
    }

    handleSumbit(e) {
        e.preventDefault()

        requester.post('appdata', 'comments', 'kinvey', {
            content: this.state.content,
            postId: this.props.postId,
            author: sessionStorage.getItem('username')
        }).then(res => {
            console.log(res)
        }).catch(res => {
            console.log(res)
        })
    }

    render() {
        return (
            <div className="submitArea">
                <h1>Post Comment</h1>
                <form id="createCommentForm" className="submitForm">
                    <label>Content:</label>
                    <input name="content" type="text" onChange={this.handleChange} />
                    <input type="submit" value="Post Comment" onClick={this.handleSumbit} />
                </form>
            </div>
        )
    }
}