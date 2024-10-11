import Vue from 'vue'
import Router from 'vue-router'

import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserCreate from '@/components/User/CreateUser'
import UserShow from '@/components/User/ShowUser'
import Login from '@/components/Login'
import CommentIndex from '@/components/Comments/index' // Fixed the typo

import BlogIndex from '@/components/Blogs/index'
import BlogCreate from '@/components/Blogs/CreateBlog'
import BlogShow from '@/components/Blogs/ShowBlog'
import BlogEdit from '@/components/Blogs/EditBlog'

import BagIndex from '@/components/Bags/index'
import BagCreate from '@/components/Bags/CreateBag'
import BagEdit from '@/components/Bags/EditBag'
import BagShow from '@/components/Bags/ShowBag'
import BagInventory from '@/components/Bags/InventoryBag'


import Upload from '@/components/Util/Upload'

Vue.use(Router)

export default new Router({
  mode: 'history', // Added this line as requested
  routes: [
    {
      path: '/bags',
      name: 'bags',
      component: BagIndex
    },
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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/bags',
      name: 'bags',
      component: BagIndex
    },
    {
      path: '/bag/create',
      name: 'bag-create',  
      component: BagCreate
    },
    {
      path: '/bag/edit/:bagId',
      name: 'bag-edit',  
      component: BagEdit
    },
    {
      path: '/bag/:bagId',  
      name: 'bag',
      component: BagShow
    },
    {
      path: '/',   //เริ่มระบบ
      name: 'login',
      component: Login,
    },
     {
      path: '/bag/:bagId',  
      name: 'inventory',
      component: BagInventory
    },
    
  ]
})