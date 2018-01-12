export default () => {
    angular
        .module('app')
        .directive('autoHeight', () => ($scope, element, attrs) => {
            $(element).css({
                marginTop: ($(window).height() - $(element).height()) / 2,
                opacity: 1
            });
        })
        .directive('uploadImg', () => ($scope, element, attrs) => {
            $(element).on('change', (e) => {
                (function fn(num) {
                    if (!e.target.files[num]) return;
                    let reader = new FileReader();
                    let oCanvas = document.createElement('canvas');
                    let ctx = oCanvas.getContext('2d');
                    let oImage = new Image();

                    oCanvas.width = 200;
                    oCanvas.height = 200;
                    reader.onload = e => oImage.src = e.target.result;
                    oImage.onload = () => {
                        ctx.drawImage(oImage, 0, 0, oImage.width, oImage.height, 0, 0, 200, 200);
                        $scope.$apply(() => {
                            $scope.img.push(oCanvas.toDataURL());
                            reader = oCanvas = oImage = ctx = undefined;
                            fn(++num);
                        });
                    }
                    reader.readAsDataURL(e.target.files[num]);
                })(0);
            })
        })
        .directive('uploadImgTo', () => ($scope, element, attrs) => {
            $(element).on('change', (e) => {
                (function fn(num) {
                    if (!e.target.files[num]) return;
                    
                    let reader = new FileReader();
                    let oCanvas = document.createElement('canvas');
                    let ctx = oCanvas.getContext('2d');
                    let oImage = new Image();

                    oCanvas.width = 200;
                    oCanvas.height = 200;
                    reader.onload = e => oImage.src = e.target.result;
                    oImage.onload = () => {
                        ctx.drawImage(oImage, 0, 0, oImage.width, oImage.height, 0, 0, 200, 200);
                        let data = {
                            src: oCanvas.toDataURL(),
                            jd: 0
                        }
                        $scope.$apply(() => {
                            $scope.img.push(data);
                            reader = oCanvas = oImage = ctx = undefined;
                            fn(++num);
                        });
                    }
                    reader.readAsDataURL(e.target.files[num]);
                })(0);
            })
        })
        .directive('headPhotoFile', () => ($scope, element, attrs) => {
            $(element).on('change', e => {
                if (!e.target.files[0]) return;
                let reader = new FileReader();
                let oCanvas = document.createElement('canvas');
                let ctx = oCanvas.getContext('2d');
                let oImage = new Image();

                oCanvas.width = 200;
                oCanvas.height = 200;
                reader.onload = e => oImage.src = e.target.result;
                oImage.onload = () => {
                    ctx.drawImage(oImage, 0, 0, oImage.width, oImage.height, 0, 0, 200, 200);
                    $scope.$apply(() => {
                        $scope.data.headphoto = oCanvas.toDataURL();
                        reader = oCanvas = oImage = ctx = undefined;
                    });
                }
                reader.readAsDataURL(e.target.files[0]);
            })
        })
        .directive('userPage', () => {
            return {
                restrict: 'AE',
                replace: true,
                template() {
                    return `
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li ng-repeat="item in list" ng-class="{active: item.page == active ? true : false}">
                            <a ui-sref="index.userlist({page: item.page})">{{item.text}}</a>
                        </li>
                    </ul>
                </nav>
                `;
                },
                controller: ['$scope', ($scope) => {
                    // active count 已经知道了
                    $scope.list = [];

                    $scope.$watch('count', (newVal) => {
                        $scope.list = [];
                        if ($scope.active > 0) $scope.list.push({ text: '<<', page: $scope.active - 1 });
                        if (newVal < 6) {
                            for (let i = 0; i < newVal; i++) {
                                $scope.list.push({ text: i + 1, page: i });
                            }
                        }
                        else if ($scope.active - 3 < 0) {
                            for (let i = 0; i < 6; i++) {
                                $scope.list.push({ text: i + 1, page: i });
                            }
                        }
                        else if ($scope.active + 4 > newVal) {
                            for (let i = newVal - 6; i < newVal; i++) {
                                $scope.list.push({ text: i + 1, page: i });
                            }
                        }
                        else {
                            for (let i = $scope.active - 3; i < $scope.active + 3; i++) {
                                $scope.list.push({ text: i + 1, page: i });
                            }
                        }

                        if ($scope.active < newVal - 1) $scope.list.push({ text: '>>', page: $scope.active + 1 });
                    });
                }]
            }
        });
}