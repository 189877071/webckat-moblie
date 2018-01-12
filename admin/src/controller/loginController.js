export default () => {
    angular.module('app').controller('loginController', ['$scope', '$rootScope', '$state', '$http', 'url',
        ($scope, $rootScope, $state, $http, url) => {

            $scope.$watch('isLogin', newVal => newVal && $state.go('index.home'));

            $scope.username = '';

            $scope.password = '';

            $scope.usernameClass = {
                'form-group': true,
                'has-error': false,
                'has-feedback': true
            }

            $scope.class = {
                username: {
                    'form-group': true,
                    'has-error': false,
                    'has-feedback': true
                },
                password: {
                    'form-group': true,
                    'has-error': false,
                    'has-feedback': true
                },
                usernameerr: '',
                passworderr: ''
            }

            $scope.userfocus = () => {
                $scope.class.username['has-error'] = false;
                $scope.class.usernameerr = '';
            }

            $scope.passfocus = () => {
                $scope.class.password['has-error'] = false;
                $scope.class.passworderr = '    ';
            }

            $scope.submit = () => {
                if ($scope.username == '') {
                    $scope.class.username['has-error'] = true;
                    $scope.class.usernameerr = '用户名不能为空';
                    return;
                }

                if ($scope.password == '') {
                    $scope.class.password['has-error'] = true;
                    $scope.class.passworderr = '密码不能为空';
                    return;
                }

                $http.post(url.login, { username: $scope.username, password: $scope.password }).success(data => {
                    if (data && data.success) {
                        $rootScope.isLogin = true;
                        return;
                    }

                    if (data.err === 1) {
                        $scope.class.username['has-error'] = true;
                        $scope.class.usernameerr = '用户名不正确';
                        return;
                    }

                    if (data.err === 2) {
                        $scope.class.password['has-error'] = true;
                        $scope.class.passworderr = '密码不正确';
                        return;
                    }

                    alert('系统出错');
                })
            }

        }]);
}