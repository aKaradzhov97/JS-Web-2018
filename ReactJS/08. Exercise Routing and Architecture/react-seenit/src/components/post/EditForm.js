import React, { Component } from 'react'
import requester from '../../infrastructure/requester'
import '../../styles/submit.css'

export default class EditForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            url: '',
            imageUrl: '',
            description: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    componentDidMount() {
        let postId = this.props.match.params.id;
        requester.get('appdata', 'posts/' + postId, 'kinvey')
            .then(res => {
                if (res._acl.creator === sessionStorage.getItem('userId')) {
                    this.setState({
                        title: res.title,
                        url: res.url,
                        imageUrl: res.imageUrl,
                        description: res.description
                    })
                } else {
                    this.props.history.push('/catalog')
                }
            }).catch(res => {
                console.log(res)
            })
    }

    handleChange(e) {
        let fieldName = e.target.name
        let fieldValue = e.target.value

        this.setState({ [fieldName]: fieldValue })
    }

    handleSumbit(e) {
        e.preventDefault()


        let postId = this.props.match.params.id;
        requester.update('appdata', 'posts/' + postId, 'kinvey', {
            title: this.state.title,
            url: this.state.url,
            imageUrl: this.state.imageUrl,
            description: this.state.description,
            author: sessionStorage.getItem('username')
        }).then(res => {
            this.props.history.push('/catalog')
        }).catch(res => {
            console.log(res)
        })
    }

    render() {
        return (
            <section id="viewPostEdit">
                <div className="submitArea">
                    <h1>Edit Post</h1>
                    <p>Please, fill out the form. A thumbnail image/description is not required.</p>
                    <form id="createPostForm" className="submitForm">
                        <label>Link URL:</label>
                        <input name="url" type="text" onChange={this.handleChange} value={this.state.url} />
                        <label>Link Title:</label>
                        <input name="title" type="text" onChange={this.handleChange} value={this.state.title} />
                        <label>Link Thumbnail Image (optional):</label>
                        <input name="imageUrl" type="text" onChange={this.handleChange} value={this.state.imageUrl} />
                        <label>Description (optional):</label>
                        <textarea name="description" onChange={this.handleChange} value={this.state.description}></textarea>
                        <input type="submit" value="Edit Post" onClick={this.handleSumbit} />
                    </form>
                </div>
            </section>
        )
    }
}