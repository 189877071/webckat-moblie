export default () => {
    angular.module('app').controller('useraddsController', ['$scope', '$http', 'url', ($scope, $http, url) => {
        $scope.users = [];

        $scope.nameStr = '';

        $scope.isLoad = false;

        $scope.loadbfb = 0;

        $scope.list = [];
        $scope.class = '1';
        $http.post(url.class).success(data => {
            if (data && data.success) {
                $scope.list = data.data;
            }
        });

        $scope.createData = () => {
            if ($scope.nameStr === '') return;

            $scope.users = [];

            let rep = /[^<\/li>]{1,}/g;
            let arr = $scope.nameStr.match(rep);

            if (!arr || !arr.length) return;

            for (let i = 0; i < arr.length; i++) {
                let str = (Date.now() + i).toString();
                $scope.users.push({
                    username: str.slice(3, str.length),
                    password: '123456',
                    headphoto: '',
                    email: str.slice(3, str.length) + '@qq.com',
                    synopsis: '',
                    sex: Math.round(Math.random()) ? '1' : '2',
                    age: Math.floor(Math.random() * 119 + 1),
                    name: arr[i],
                    issystem: true
                });
            }

            $scope.nameStr = '';
        }

        $scope.rmUser = index => $scope.users.splice(index, 1);

        $scope.upload = () => {
            $scope.isLoad = true;
            (function fn(num) {
                if (!$scope.users[num]) {
                    $scope.isLoad = false;
                    $scope.loadbfb = 0;
                    $scope.users = [];
                    return;
                }

                $scope.loadbfb = Math.ceil((num / $scope.users.length) * 100);

                $http.post(url.addUser, { ...$scope.users[num], uclass: $scope.class }).success(data => {
                    fn(++num);
                })
            })(0);
        }
    }]);
}