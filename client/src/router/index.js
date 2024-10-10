import Vue from "vue";
import Router from "vue-router";

import UserIndex from "@/components/User/index";
import UserEdit from "@/components/User/EditUser";
import UserCreate from "@/components/User/CreateUser";
import UserShow from "@/components/User/ShowUser";
import Login from "@/components/Login";

import CommentIndex from "@/components/Comments/index";

import BlogIndex from "@/components/Blogs/index";
import BlogCreate from "@/components/Blogs/CreateBlog";
import BlogShow from "@/components/Blogs/ShowBlog";
import BlogEdit from "@/components/Blogs/EditBlog";

import Upload from "@/components/Util/Upload";

// Add Book components
import BookIndex from "@/components/Books/index";
import BookCreate from "@/components/Books/CreateBook";
import BookShow from "@/components/Books/ShowBook";
import BookEdit from "@/components/Books/EditBook";

// Importing Rental components
import RentalIndex from "@/components/Rentals/index";
import RentalCreate from "@/components/Rentals/CreateRental";
import RentalEdit from "@/components/Rentals/EditRental";
import RentalShow from "@/components/Rentals/ShowRental";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogIndex
    },
    {
      path: '/blog/create',
      name: 'blog-create',
      component: BlogCreate
    },
    {
      path: '/blog/edit/:blogId',
      name: 'blog-edit',
      component: BlogEdit
    },
    {
      path: '/blog/:blogId',
      name: 'blog',
      component: BlogShow
    },
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },

    // Book Routes
    {
      path: "/books",
      name: "books",
      component: BookIndex,
    },
    {
      path: "/book/create",
      name: "book-create",
      component: BookCreate,
    },
    {
      path: "/book/edit/:isbn",
      name: "book-edit",
      component: BookEdit,
      props: true,
    },
    {
      path: "/book/:isbn",
      name: "book",
      component: BookShow,
    },

    // Rental Routes
    {
      path: "/rentals",
      name: "rentals",
      component: RentalIndex,
    },
    {
      path: "/rental/create",
      name: "rental-create",
      component: RentalCreate,
    },
    {
      path: "/rental/edit/:rentalId",
      name: "rental-edit",
      component: RentalEdit,
    },
    {
      path: "/rental/:rentalId",
      name: "rental",
      component: RentalShow,
    },
  ],
});
