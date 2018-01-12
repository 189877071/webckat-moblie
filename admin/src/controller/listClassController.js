export default () => {
    angular.module('app').controller('listClassController', ['$scope', '$http', 'url', ($scope, $http, url) => {
        $scope.list = [];
        $scope.addLoad = false;
        $http.post(url.class).success(data => {
            if (data && data.success) {
                $scope.list = data.data;
            }
        });

        $scope.rm = (id, index) => {
            if (!id || index === undefined) return;
            if (!confirm('确定要删除吗?')) return;
            $scope.addLoad = true;
            $http.post(url.class, { state: 'rm', id }).success(data => {
                if (data && data.success) {
                    alert('删除成功');
                    $scope.list.splice(index, 1);
                }
                else {
                    alert('删除失败');
                }
                $scope.addLoad = false;
            })
        }
    }]);
}