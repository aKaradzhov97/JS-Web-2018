import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/menu.css'

const Navigation = () => {
    return (
        <div id="menu">
            <div className="title">Navigation
                <NavLink className="nav" to="/catalog">Catalog</NavLink>
                <NavLink className="nav" to="/create/post">Create Post</NavLink>
                <NavLink className="nav" to="/user/posts">My Posts</NavLink>
            </div>
        </div>
    )
}

export default Navigation