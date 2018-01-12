import indexT from './template/index.html'
import iHomeT from './template/index.home.html'
import iUserlistT from './template/index.userlist.html'
import iUseraddT from './template/index.useradd.html'
import iUseraddsT from './template/index.useradds.html'
import iHeadphotoT from './template/index.headphoto.html'
import iHeadphotolistT from './template/index.headphotolist.html'
import iUpdateT from './template/index.update.html'
import iAddclassT from './template/index.addclass.html'
import iListClassT from './template/index.listclass.html'
import iSendnoticeT from './template/index.sendnotice.html'
import iNoticelistT from './template/index.noticelist.html'
import iNoticeT from './template/index.notice.html'
import loadT from './template/load.html'
import loginT from './template/login.html'


export default () => {
    
    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

            $urlRouterProvider.otherwise("/404").when('', '/load').when('/index', '/index/home');

            $stateProvider
                .state('index', {
                    url: '/index',
                    template: indexT,
                    controller: 'indexController'
                })
                .state('index.home', {
                    url: '/home',
                    template: iHomeT,
                    controller: 'homeController'
                })
                .state('index.userlist', {
                    url: '/userlist?page',
                    template: iUserlistT,
                    controller: 'userListController'
                })
                .state('index.useradd', {
                    url: '/useradd',
                    template: iUseraddT,
                    controller: 'useraddController'
                })
                .state('index.useradds', {
                    url: '/useradds',
                    template: iUseraddsT,
                    controller: 'useraddsController'
                })
                .state('index.headphoto', {
                    url: '/headphoto',
                    template: iHeadphotoT,
                    controller: 'headphotoController'
                })
                .state('index.headphotolist', {
                    url: '/headphotolist',
                    template: iHeadphotolistT,
                    controller: 'headphotolistController'
                })
                .state('index.update', {
                    url: '/update?id',
                    template: iUpdateT,
                    controller: 'updateController'
                })
                .state('index.addclass', {
                    url: '/addclass',
                    template: iAddclassT,
                    controller: 'classController'
                })
                .state('index.listclass', {
                    url: '/listclass',
                    template: iListClassT,
                    controller: 'listClassController'
                })
                .state('index.updateclass', {
                    url: '/updateclass?id&name',
                    template: iAddclassT,
                    controller: 'updateclassController'
                })
                .state('index.sendnotice', {
                    url: '/sendnotice',
                    template: iSendnoticeT,
                    controller: 'sendnoticeController'
                })
                .state('index.noticelist', {
                    url: '/noticelist',
                    template: iNoticelistT,
                    controller: 'sendnoticeController'
                })
                .state('index.notice', {
                    url: '/notice/:id',
                    template: iNoticeT,
                    controller: 'sendnoticeController'
                })
                .state('load', {
                    url: '/load',
                    template: loadT
                })
                .state('login', {
                    url: '/login',
                    template: loginT,
                    controller: 'loginController'
                });
        }]);
}