import React, { Component } from 'react'
import requester from '../../infrastructure/requester'
import '../../styles/submit.css'

export default class CreateForm extends Component {
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

        requester.post('appdata', 'posts', 'kinvey', {
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
            <section id="viewPostCreate">
                <div className="submitArea">
                    <h1>Create Post</h1>
                    <p>Please, fill out the form. A thumbnail image/description is not required.</p>
                    <form id="createPostForm" className="submitForm">
                        <label>Link URL:</label>
                        <input name="url" type="text" onChange={this.handleChange} />
                        <label>Link Title:</label>
                        <input name="title" type="text" onChange={this.handleChange} />
                        <label>Link Thumbnail Image (optional):</label>
                        <input name="imageUrl" type="text" onChange={this.handleChange} />
                        <label>Description (optional):</label>
                        <textarea name="description" onChange={this.handleChange}></textarea>
                        <input type="submit" value="Create Post" onClick={this.handleSumbit} />
                    </form>
                </div>
            </section>
        )
    }
}