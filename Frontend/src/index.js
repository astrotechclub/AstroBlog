import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import Settings from './pages/settings';
import Article from './pages/article';
import E404 from "./pages/E404";
import WriteArticle from "./pages/writeArticle";
import User from "./pages/user";
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Profile from './pages/profile';
import Community from "./pages/community";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Signup />
  },
  {
    path: '/home',
    element: <Home />
  }, {
    path: '/settings',
    element: <Settings />
  }, {
    path: '/article/:articleId',
    element: <Article />
  },
  {
    path: '/write_article/:id',
    element: <WriteArticle />
  }, {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/profile/:id',
    element: <User />
  },
  {
    path: '/community/:id',
    element: <Community />
  },
  {
    path: '/E404',
    element: <E404 />
  },
  {
    path: "/*",
    element: <E404 />
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
