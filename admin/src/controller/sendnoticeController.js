export default () => {
    angular.module('app').controller('sendnoticeController', ['$scope', 'url', '$http', '$stateParams', '$state', ($scope, url, $http, $stateParams, $state) => {

        $scope.add = {
            title: '',
            content: '',
            submit() {
                const { title, content } = $scope.add;

                if (title == '' || content == '') {
                    alert('数据不完整');
                    return;
                }

                if (title.length > 60) {
                    alert('标题长度不能大于60位字符');
                    return;
                }

                $http.post(url.notice, { title, content, state: 'add' }).success(data => {
                    if (data.success) {
                        alert('添加成功');
                        $scope.add.title = '';
                        $scope.add.content = '';
                        $state.go('index.noticelist');
                        return;
                    }
                    console.log(data);
                    alert('添加失败');
                })
            }
        }

        $scope.all = {
            data: [],
            getData() {
                if ($scope.all.data.length) return;

                $http.post(url.notice, { state: 'all' }).success(data => {

                    if (!data.success) {
                        alert('数据获取失败');
                        return;
                    }
                    $scope.all.data = data.data;
                })
            },
            rm(id, index) {
                if (!id || !confirm('确定要删除吗')) return;

                $http.post(url.notice, { state: 'rm', id }).success(result => {
                    if (!result.success) {
                        alert('删除失败');
                        return;
                    }
                    $scope.all.data.splice(index, 1);
                })

            }
        }


        $scope.one = {
            title: '',
            content: '',
            time: 0,
            getData() {
                if (!$stateParams.id) return;
                $http.post(url.notice, { state: 'one', id: $stateParams.id }).success(result => {
                    if (!result.success) {
                        alert('数据不存在');
                        return;
                    }
                    $scope.one.title = result.data.title;
                    $scope.one.content = result.data.content;
                    $scope.one.time = result.data.otime;
                })
            }
        }

        $scope.all.getData();
        $scope.one.getData();
    }]);
}