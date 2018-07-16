import React, { Component } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/common/Home'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Catalog from './components/catalog/Catalog'
import CreateForm from './components/post/CreateForm'
import Delete from './components/post/Delete'
import EditForm from './components/post/EditForm'
import Logout from './components/user/Logout';
import MyPosts from './components/post/MyPosts';
import PostDetails from './components/post/PostDetails';
import DeleteComment from './components/comment/DeleteComment';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Switch>
            <Route path="/catalog" component={Catalog} />
            <Route path="/create/post" component={CreateForm} />
            <Route path="/user/posts" component={MyPosts} />
            <Route path="/post/details/:id" component={PostDetails} />
            <Route path="/post/delete/:id" component={Delete} />
            <Route path="/post/edit/:id" component={EditForm} />
            <Route path="/comment/delete/:id" component={DeleteComment} />
            <Route path="/logout" component={Logout} />
            <Route path="/" component={Home} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
