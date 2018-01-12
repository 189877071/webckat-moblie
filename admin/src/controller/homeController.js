export default () => {
    angular.module('app').controller('homeController', ['$scope', '$http', 'url', ($scope, $http, url) => {
        $scope.admin = {
            username: '',
            password: ''
        }
        $scope.db = {
            connectionLimit: 10,
            database: '',
            host: '',
            password: '',
            user: ''
        }
        $scope.email = {
            host: '',
            pass: '',
            port: '',
            user: ''
        }

        $http.post(url.systemData).success(data => {
            if (!data || !data.success) return;
            $scope.admin.username = data.admin.username;
            $scope.db = data.db;
            $scope.email = data.email;
        });

        $scope.adminSubmit = () => {
            let data = {
                username: $scope.admin.username
            }

            if ($scope.admin.password) {
                if ($scope.admin.password.length < 6 || $scope.admin.password.length > 20) {
                    alert('管理员密码长度不能少于6位大于20位');
                    return;
                }

                data.password = $scope.admin.password;
            }

            $http.post(url.upLogunUser, data).success(data => {
                if (data && data.success) {
                    alert('保存成功');
                    location.reload();
                    return;
                }
                alert('保存失败');
            })
        }

        $scope.dbSubmit = () => {
            $http.post(url.upConfig, { ...$scope.db, state: 'db' }).success(data => {
                if (data && data.success) {
                    alert('保存成功, 重启系统后更新');
                    return;
                }
                alert('保存失败');
            })
        }

        $scope.emailSubmit = () => {
            $http.post(url.upConfig, { ...$scope.email, state: 'email' }).success(data => {
                if (data && data.success) {
                    alert('保存成功, 重启系统后更新');
                    return;
                }
                alert('保存失败');
            })
        }
    }]);
}