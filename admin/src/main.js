import './style.scss'

import directive from './directive'

import router from './router'

import indexController from './controller/indexController'

import loginController from './controller/loginController'

import headphotoController from './controller/headphotoController'

import headphotolistController from './controller/headphotolistController'

import useraddController from './controller/useraddController'

import useraddsController from './controller/useraddsController'

import userListController from './controller/userListController'

import updateController from './controller/updateController'

import homeController from './controller/homeController'

import classController from './controller/classController'

import listClassController from './controller/listClassController'

import updateclassController from './controller/updateclassController'

import sendnoticeController from './controller/sendnoticeController'

const [baseUrl, imgMainUrl] = [`${process.env.HOST_NAME}/admin`, `${process.env.HOST_NAME}/image`];

angular
.module('app', ['ui.router', 'ngAnimate'])
.constant('url', {
    init: baseUrl + '/init',
    photo: baseUrl + '/cjheadphoto',
    login: baseUrl + '/login',
    addUser: baseUrl + '/adduserto',
    users: baseUrl + '/users',
    rmUser: baseUrl + '/rmuser',
    updateUser: baseUrl + '/updateuser',
    upLogunUser: baseUrl + '/uploginuser',
    systemData: baseUrl + '/getsystemdata',
    upConfig: baseUrl + '/upconfig',
    exit: baseUrl + '/exit',
    class: baseUrl + '/class',
    notice: baseUrl + '/notice'
})
.config(['$httpProvider', $httpProvider => {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' }
}])
.run(['$rootScope', '$state', '$http', 'url', ($rootScope, $state, $http, url) => {
    $rootScope.imgMainUrl = imgMainUrl;

    $http.get(url.init).success((data) => {
        if (!data.success) {
            $state.go('login');
        }
        else if(location.hash == '#/load') {
            $state.go('index.home');
        }
        $rootScope.isLogin = data.success;
    });
}])
.animation('.set-img-box', () => {
    let num = 0;
    return {
        enter: (element, done) => {
            setTimeout(() => $(element).css('opacity', 1), num * 50);
            num++;
        },
        leave: (element, done) => {
            $(element).remove();
        }
    }
})
.filter('getClass', () => (data, allClass) => {
    if(!allClass && !isArray(allClass)) return data;
    
    for(let i=0; i< allClass.length; i++) {
        if(allClass[i].id == data) return allClass[i].name;
    }
});

directive();

router();

indexController();

loginController();

headphotoController();

headphotolistController();

useraddController();

useraddsController();

userListController();

updateController();

homeController();

classController();

listClassController();

updateclassController();

sendnoticeController();