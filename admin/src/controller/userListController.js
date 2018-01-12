export default () => {
    angular.module('app').controller('userListController', ['$scope', '$stateParams', 'url', '$http', ($scope, $stateParams, url, $http) => {
        const num = 25;

        $scope.users = [];

        $scope.count = 0;

        $scope.onoff = false;

        $scope.active = $stateParams.page ? parseInt($stateParams.page) : 0;

        $http.post(url.users, { page: $scope.active, num }).success(data => {
            if (!data) return;
            data.count && ($scope.count = Math.ceil(data.count / num));
            data.users && ($scope.users = data.users);
        });

        $scope.allClass = [];

        $http.post(url.class).success(data => {
            if (data && data.data) {
                $scope.allClass = data.data;
            }
        });

        $scope.rmuser = (id, index) => {

            if (!id) return;

            if (!confirm('确定要执行删除操作吗？')) return;

            $http.post(url.rmUser, { id }).success(data => {
                if (!data || !data.success) {
                    alert('删除失败！')
                    return;
                }
                $scope.users.splice(index, 1);
            });
        }

    }]);
}