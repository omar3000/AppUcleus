angular
    .module("myApp")
    .controller("VentaAdminController", VentaAdminController);

function VentaAdminController($scope, $http, $mdDialog, $interval, VentaAdminService) {
    var imagePath = 'img/list/60.jpeg';

    $scope.theme = 'red';

    var isThemeRed = true;

    $scope.PedidosNegocio = function () {
        var response = VentaAdminService.PedidosNegocio();
        response.then(function (response) {
            $scope.pedidos = response.data;
        }, function () {
            alert("Error Occur");
        })
    };

    $scope.showAdvanced = function (ev, item) {
        $mdDialog.show({
            controller: DialogController,
            locals: {
                item: item
            },
            templateUrl: 'dialog2.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        }).then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
    };

    function DialogController($scope, $mdDialog, $http, item) {

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };

        $scope.TraerPedido = function () {
            $scope.idVenta = item;
            $scope.cantidad = {};
            var response = VentaAdminService.TraerPedido(item);
            response.then(function (response) {
                $scope.productos = response.data;
            }, function () {
                alert("Error Occur");
            });
        };
    }



    $scope.traerCantidad = function (idProd, index, idVenta) {
        var response = VentaAdminService.traerCantidad(idProd, idVenta);
        response.then(function (response) {

            $scope.cantidad[index] = response.data;
        }, function () {
            alert("Error Occur");
        });
    }; 

};