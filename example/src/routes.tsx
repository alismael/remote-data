import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Layout,
  HomeContainer,
  PostsContainer,
  UsersContainer,
  UsersPostsContainer,
} from './app/containers';

const AppRoutes = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/users-posts" component={UsersPostsContainer} />
        <Route path="/users" component={UsersContainer} />
        <Route path="/posts" component={PostsContainer} />
        <Route path="/" component={HomeContainer} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default AppRoutes;
