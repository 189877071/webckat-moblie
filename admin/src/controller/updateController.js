export default () => {
    angular.module('app').controller('updateController', ['$scope', '$http', 'url', '$stateParams', ($scope, $http, url, $stateParams) => {

        if (!$stateParams.id) return;

        $scope.isload = false;

        $scope.data = {
            username: '',
            password: '',
            headphoto: '',
            email: '',
            synopsis: '',
            sex: '1',
            age: 0,
            name: '',
            issystem: true,
            class: '1'
        }

        $scope.err = {
            username: false,
            name: false,
            email: false,
            password: false,
            age: false
        }

        $http.post(url.users, { id: $stateParams.id }).success(data => {
            if (!data || !data.success) return;
            const rep = /^\/uploader/;
            $scope.data = data.user;
            $scope.data.password = '';
            $scope.data.class = $scope.data.class.toString();
            data.user.issystem == '2' ? $scope.data.issystem = true : $scope.data.issystem = false;
            $scope.oddHeadPhoto = $scope.data.headphoto = ( rep.test($scope.data.headphoto) ? process.env.HOST_NAME : $scope.imgMainUrl) + '/' + $scope.data.headphoto;
        });

        $scope.allClass = [];

        $http.post(url.class).success(data => {
            if (data && data.data) {
                $scope.allClass = data.data;
            }
        });

        $scope.submit = () => {
            if ($scope.data.username === '') {
                $scope.err.username = true;
                return;
            }
            if ($scope.data.email === '' || !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test($scope.data.email)) {
                $scope.err.email = true;
                return;
            }
            if ($scope.data.age < 0 || $scope.data.age > 120) {
                $scope.err.age = true;
                return;
            }

            $scope.isload = true;

            let xhr = new XMLHttpRequest();
            let oFormData = new FormData();

            oFormData.append('id', $scope.data.id);
            oFormData.append('username', $scope.data.username);
            oFormData.append('password', $scope.data.password);
            oFormData.append('headphoto', $scope.data.headphoto === $scope.oddHeadPhoto ? '' : $scope.data.headphoto);
            oFormData.append('synopsis', $scope.data.synopsis);
            oFormData.append('sex', $scope.data.sex);
            oFormData.append('age', $scope.data.age);
            oFormData.append('name', $scope.data.name);
            oFormData.append('issystem', $scope.data.issystem);
            oFormData.append('email', $scope.data.email);
            oFormData.append('uclass', Number($scope.data.class));

            xhr.open('post', url.updateUser, true);

            xhr.responseType = 'json';
            xhr.setRequestHeader('X-Custom-Header', 'XMLHttpRequest');
            xhr.withCredentials = true;

            xhr.onload = function () {
                $scope.$apply(() => {
                    $scope.isload = false;
                    if (xhr.response && xhr.response.success) {
                        alert('修改成功');
                        history.back();
                        return;
                    }
                    alert('添加失败');
                });
            }

            xhr.send(oFormData);
        }
    }]);
}