angular
    .module("myApp")
    .controller("VentaController", VentaController);

function VentaController($scope, $http, $mdDialog, $interval, VentaService, NegocioService) {
    var imagePath = 'img/list/60.jpeg';

    $scope.theme = 'red';

    var isThemeRed = true;

    $scope.PedidosCliente = function () {
        $scope.negocio = {};
        var response = VentaService.PedidosCliente();
        response.then(function (response) {
            $scope.pedidos = response.data;
        }, function () {
            alert("Error Occur");
        })
    };

    $scope.traerNegocio = function (idNegocio, index) {
        var response = NegocioService.traerNegocio(idNegocio);
        response.then(function (response) {
            $scope.negocio[index] = response.data;
        }, function () {
            alert("Error Occur");
        })
    };

    $scope.showAdvanced = function (ev, item) {
        $scope.idVenta = item;
        $scope.cantidad = {};
        $scope.detalle = {};
        var response = VentaService.TraerPedido(item);
        
        response.then(function (response) {
            $scope.negoci = response.data.negocio;
            $scope.productos = response.data.prod;
            $scope.detalle = response.data.dv;
            $scope.venta = response.data.venta;
        }, function () {
            alert("Error Occur");
        });
    };




    $scope.traerCantidad = function (idProd, index, idVenta) {
        var response = VentaService.traerCantidad(idProd, idVenta);
        response.then(function (response) {

            $scope.cantidad[index] = response.data;
        }, function () {
            alert("Error Occur");
        });
    };

};