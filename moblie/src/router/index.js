import Vue from 'vue'

import Router from 'vue-router'

import Index from '../components/Index.vue'
import Users from '../components/Users.vue'
import Notice from '../components/Notice.vue'
import Set from '../components/Set.vue'
import Name from '../components/Name.vue'
import Email from '../components/Email.vue'
import Password from '../components/PassWord.vue'
import Age from '../components/Age.vue'
import Synopsis from '../components/Synopsis.vue'
import NoticeContent from '../components/NoticeContent.vue'
import Search from '../components/Search.vue'
import Chat from '../components/Chat.vue'
import Infor from '../components/Infor.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/index',
            name: 'index',
            component: Index,
            children: [
                {
                    path: 'chat/:id',
                    name: 'indexChat',
                    component: Chat,
                    children: [
                        {
                            path: 'infor',
                            name: 'indexChatInfor',
                            component: Infor
                        }
                    ]
                }
            ]
        },
        {
            path: '/users',
            name: 'users',
            component: Users,
            children: [
                {
                    path: 'chat/:id',
                    name: 'userChat',
                    component: Chat,
                    children: [
                        {
                            path: 'infor',
                            name: 'userChatInfor',
                            component: Infor
                        }
                    ]
                }
            ]
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        },
        {
            path: '/notice',
            name: 'notice',
            component: Notice,
            children: [
                {
                    path: 'noticeContent/:id',
                    name: 'noticeContent',
                    component: NoticeContent
                }
            ]
        },
        {
            path: '/set',
            name: 'set',
            component: Set,
            children: [
                {
                    path: 'name',
                    name: 'name',
                    component: Name
                },
                {
                    path: 'email',
                    name: 'email',
                    component: Email
                },
                {
                    path: 'password',
                    name: 'password',
                    component: Password
                },
                {
                    path: 'age',
                    name: 'age',
                    component: Age
                },
                {
                    path: 'synopsis',
                    name: 'synopsis',
                    component: Synopsis
                }
            ]
        },
        { path: '/', redirect: '/index' }
    ]
})