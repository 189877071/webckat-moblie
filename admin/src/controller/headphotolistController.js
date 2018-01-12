export default () => {
    angular.module('app').controller('headphotolistController', ['$scope', '$http', 'url', ($scope, $http, url) => {
        $scope.img = [];
        $http.post(url.photo, { state: 'get' }).success(data => {
            $scope.img = data.data
        });

        $scope.rmImg = (index, id) => {
            $http.post(url.photo, { state: 'rm', id }).success(data => {
                if (data && data.success) {
                    $scope.img.splice(index, 1);
                    return;
                }
                alert('删除失败');
            })
        }
    }]);
}