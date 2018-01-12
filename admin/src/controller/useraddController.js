export default () => {
    angular.module('app').controller('useraddController', ['$scope', '$http', 'url', ($scope, $http, url) => {
        $scope.isload = false;
        $scope.data = {
            username: '',
            password: '123456',
            headphoto: '',
            email: '',
            synopsis: '',
            sex: '1',
            age: 22,
            name: '',
            issystem: true
        }

        $scope.err = {
            username: false,
            name: false,
            email: false,
            password: false,
            age: false
        }

        $scope.allClass = [];
        $scope.class = '1';
        $http.post(url.class).success(data => {
            if (data && data.data) {
                $scope.allClass = data.data;
            }
        })

        $scope.changefn = key => $scope.err[key] && ($scope.err[key] = false);

        $scope.submit = () => {

            if ($scope.data.username === '') {
                $scope.err.username = true;
                return;
            }
            if ($scope.data.name === '') {
                $scope.err.name = true;
                return;
            }
            if ($scope.data.email === '' || !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test($scope.data.email)) {
                $scope.err.email = true;
                return;
            }
            if ($scope.data.password === '') {
                $scopep.err.password = true;
                return;
            }
            if ($scope.data.age < 0 || $scope.data.age > 120) {
                $scope.err.age = true;
                return;
            }
            $scope.isload = true;
            let xhr = new XMLHttpRequest();
            let oFormData = new FormData();

            oFormData.append('username', $scope.data.username);
            oFormData.append('password', $scope.data.password);
            oFormData.append('headphoto', $scope.data.headphoto);
            oFormData.append('synopsis', $scope.data.synopsis);
            oFormData.append('sex', $scope.data.sex);
            oFormData.append('age', $scope.data.age);
            oFormData.append('name', $scope.data.name);
            oFormData.append('issystem', $scope.data.issystem);
            oFormData.append('email', $scope.data.email);
            oFormData.append('uclass', Number($scope.class));

            xhr.open('post', url.addUser, true);

            xhr.responseType = 'json';
            xhr.setRequestHeader('X-Custom-Header', 'XMLHttpRequest');
            xhr.withCredentials = true;

            xhr.onload = function () {
                $scope.$apply(() => {
                    $scope.isload = false;
                    if (xhr.response && xhr.response.success) {
                        $scope.data = {
                            username: '',
                            password: '123456',
                            headphoto: '',
                            email: '',
                            synopsis: '',
                            sex: '1',
                            age: 22,
                            name: '',
                            issystem: true
                        }
                        $scope.class = '1';
                        return;
                    }
                    alert('添加失败');
                });
            }

            xhr.send(oFormData);
        }
    }]);

}