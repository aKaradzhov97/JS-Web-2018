import React, { Component } from 'react'
import requester from '../../infrastructure/requester'

export default class DeleteComment extends Component {
    delete = (props) => {
        let commentId = this.props.match.params.id;
        requester.get('appdata', 'comments/' + commentId, 'kinvey')
            .then(res => {
                if (res.author === sessionStorage.getItem('username')) {
                    requester.remove('appdata', 'comments/' + commentId, 'kinvey')
                        .then(res => {
                            this.props.history.push('/catalog')
                        }).catch(res => {
                            console.log(res)
                        })
                } else {
                    this.props.history.push('/catalog')
                }
            }).catch(res => {
                console.log(res)
            })
    }

    render() {
        this.delete();
        return (
            <div></div>
        )
    }
}