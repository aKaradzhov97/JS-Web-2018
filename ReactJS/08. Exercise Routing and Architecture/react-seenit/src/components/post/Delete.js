import React, { Component } from 'react'
import requester from '../../infrastructure/requester'

export default class Delete extends Component {
    delete = (props) => {
        let postId = this.props.match.params.id;
        requester.get('appdata', 'posts/' + postId, 'kinvey')
            .then(res => {
                if (res._acl.creator === sessionStorage.getItem('userId')) {
                    requester.remove('appdata', 'posts/' + postId, 'kinvey')
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