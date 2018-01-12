export default () => {
    angular.module('app').controller('updateclassController', ['$scope', '$stateParams', '$state', '$http', 'url', ($scope, $stateParams, $state, $http, url) => {
        if (!$stateParams.id) return;

        $scope.name = $stateParams.name;
        $scope.load = false;
        $scope.submit = () => {
            if (!$scope.name) {
                alert('分类名称不能为空');
                return;
            }
            $scope.load = true;
            $http.post(url.class, { state: 'update', id: $stateParams.id, name: $scope.name }).success(data => {
                if (data && data.success) {
                    alert('修改成功');
                    $state.go('index.listclass');
                }
                else {
                    alert('修改失败');
                }
                $scope.load = false;
            })
        }
    }]);
}