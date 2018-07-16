import React, { Component } from 'react'
import Navigation from './Navigation'
import Notification from '../common/Notification'
import PostsList from '../post/PostsList'
import '../../styles/site.css'


export default class Catalog extends Component {
    render() {
        return (
            <div id="container">
                <div className="content">
                    <Notification />
                    <Navigation />
                    <PostsList />
                </div>
            </div>
        )
    }
}