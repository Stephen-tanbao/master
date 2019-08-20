import Vue from 'vue';
import vueRouter from 'vue-router';

import login from '../components/admin/login/login';
import adminLogin from '../components/admin/login/adminLogin';
import adminMain from '../components/admin/main/main';
import webInfo from '../components/admin/webinfo/webinfo';
import banner from '../components/admin/banner/banner';
import updatabanner from '../components/admin/banner/updatabanner';
import querymanager from '../components/admin/manager/querymanager';
import goodscate from '../components/admin/goods/goodscate';
import bookscate from '../components/admin/books/bookscate';
import updataGoodsCate from '../components/admin/goods/updataGoodsCate';
import updataBooksCate from '../components/admin/books/updataBooksCate';
import updatamanager from '../components/admin/manager/updatamanager';
import user from '../components/admin/user/user';
import goods from '../components/admin/goods/goods';
import books from '../components/admin/books/books';
import wantbuy from '../components/admin/goods/wantbuy';
import recruit from '../components/admin/goods/recruit';
import content from '../components/admin/content/content';

Vue.use(vueRouter);
export default new vueRouter({
    routes:[
        {path:'/admin/login',component:login,name:'login'},
        {path:'/admin/adminLogin',component:adminLogin,name:'adminLogin'},
        {
            path:'/admin/main',
            component:adminMain,
            name:'main',
            children: [
                {path:'/admin/main/webinfo',component:webInfo,name:'webinfo'},
                {path:'/admin/main/banner',component:banner,name:'banner'},
                {path:'/admin/main/updatabanner',component:updatabanner,name:'updatabanner'},
                {path:'/admin/main/querymanager',component:querymanager,name:'querymanager'},
                {path:'/admin/main/goodscate',component:goodscate,name:'goodscate'},
                {path:'/admin/main/updataGoodsCate',component:updataGoodsCate,name:'updataGoodsCate'},
                {path:'/admin/main/updatamanager',component:updatamanager,name:'updatamanager'},
                {path:'/admin/main/bookscate',component:bookscate,name:'bookscate'},
                {path:'/admin/main/updataBooksCate',component:updataBooksCate,name:'updataBooksCate'},
                {path:'/admin/main/user',component:user,name:'user'},
                {path:'/admin/main/goods',component:goods,name:'goods'},
                {path:'/admin/main/books',component:books,name:'books'},
                {path:'/admin/main/wantbuy',component:wantbuy,name:'wantbuy'},
                {path:'/admin/main/recruit',component:recruit,name:'recruit'},
                {path:'/admin/main/content',component:content,name:'content'},
            ]
        },
    ]
})