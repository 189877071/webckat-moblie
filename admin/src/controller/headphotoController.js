export default () => {
    angular.module('app').controller('headphotoController', ['$scope', 'url', ($scope, url) => {
        $scope.img = [];
        $scope.isUpload = false;
        $scope.jd = 0;
        $scope.rmImg = index => $scope.img.splice(index, 1);

        $scope.submit = () => {
            $scope.isUpload = true;
            
            (function fn() {
                if (!$scope.img[0]) {
                    
                    $scope.$apply(() => {
                        $scope.isUpload = false;
                    });

                    return;
                }

                let xhr = new XMLHttpRequest();
                
                let oFormData = new FormData();
                
                oFormData.append('imgData', $scope.img[0].src);
                
                xhr.open('POST', url.photo, true);
                
                xhr.responseType = 'json';

                xhr.setRequestHeader('X-Custom-Header', 'XMLHttpRequest');
                xhr.withCredentials = true;

                xhr.upload.onprogress = function (e) {
                    if (e.lengthComputable) {
                        $scope.$apply(() => {
                            $scope.img[0].jd = parseInt((e.loaded / e.total) * 100);
                        });
                    }
                };

                xhr.onload = function () {
                    $scope.$apply(() => {
                        $scope.img.splice(0, 1);
                    });

                    fn();
                }

                xhr.send(oFormData);
            })()
        };

    }]);
}
