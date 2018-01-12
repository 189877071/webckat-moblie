export default () => {
    angular.module('app').controller('indexController', ['$scope', '$state', '$http', 'url', ($scope, $state, $http, url) => {
        $scope.exit = () => {
            $http.post(url.exit).success(data => {
                if (data && data.success) {
                    alert('退出成功');
                    location.reload();
                    return;
                }
                alert('退出失败');
            })
        }
    }]);
}
