angular
    .module("myApp")
    .controller("CarritoController", CarritoController);

function CarritoController($scope, CarritoService) {



    $scope.TraerCarrito = function () {
        $scope.cantidad = {};
        $scope.total = 0;
        var response = CarritoService.TraerCarrito();
        response.then(function (response) {
            $scope.productosC = response.data;
        }, function () {
            alert("Error Occur");
        });
    };

    $scope.traerCantidad = function (idProd, index) {
        var response = CarritoService.traerCantidad(idProd);
        response.then(function (response) {
            
            
            if (response.data.cantidad == 0) {
                $scope.productosC.splice(index, 1);
                $scope.cantidad.splice(index, 1);
                $scope.$apply;

            }
            else {
                $scope.cantidad[index] = response.data.cantidad;
            }
            $scope.total = response.data.total;
           
        }, function () {
            alert("Error Occur");
        });
    }; 

    $scope.actualizarCantidad = function (idProd, cantidad, index) {
        
        var response = CarritoService.ActualizarCantidad(idProd, cantidad);
        response.then(function (response) {
            $scope.traerCantidad(idProd, index);
            return response.data;
        }, function () {
            alert("Error Occur");
        });
    };


    $scope.enviarPedido = function () {

        var response = CarritoService.enviarPedido();
        response.then(function (response) {
            $("#alertModal").modal('show');

            $scope.msg = "Se ha enviado tu pedido";
            
            return response.data;
        }, function () {
            alert("Error Occur");
        });
    };

    $scope.alertmsg = function () {
        $("#alertModal").modal('hide');
        location.reload();
    };
    
 
}