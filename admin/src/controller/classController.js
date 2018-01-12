export default () => {
    angular.module('app').controller('classController', ['$scope', '$state', '$http', 'url', ($scope, $state, $http, url) => {
        $scope.name = '';
        $scope.load = false;

        $scope.submit = () => {
            $scope.load = true;
            $http.post(url.class, { name: $scope.name, state: 'add' }).success(data => {
                if (data && data.success) {
                    alert('添加成功');
                    $state.go('index.listclass');
                }
                else {
                    alert('添加失败');
                }
                $scope.load = false;
            });
        }
    }]);
}