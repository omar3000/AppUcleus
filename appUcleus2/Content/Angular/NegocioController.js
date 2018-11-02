angular
    .module("myApp")
    .controller("NegocioController", NegocioController);

function NegocioController($scope, NegocioService, CarritoService, ProductoService, CategoriaService) {

    $scope.GetAllData = function () {

        var response = NegocioService.GetAllNegocios();

        response.then(function (response) {
            $scope.negocios = response.data;
        }, function () {
            alert("Error Occur");
        });
    };


    $scope.algoritmoRecomendaciones = function () {
        var response = NegocioService.algoritmoRecomendaciones();

        response.then(function (response) {
            $scope.negocios2 = response.data;
        }, function () {
            alert("Error Occur");
        });
    };

    $scope.traerNegocio = function () {

        var response = NegocioService.traerNegocio2();

        response.then(function (response) {
            $scope.negocio = response.data;
        }, function () {
            alert("Error Occur");
        });
    };

    $scope.AddCarrito = function (item) {
        var response = CarritoService.AddCarrito(item);
        response.then(function (response) {


            $("#alertModal").modal('show');
            
            if (response.data == 1) {
                $scope.msg = "Se agrego " + item.producto + " al carrito correctamente";
            }
            else if (response.data == 2) {
                $scope.msg = "Se agrego " + item.producto + " al carrito correctamente";
                $("#ejem").show();
            }
            else if (response.data == 0) {
                $scope.msg = "Lo sentimos el producto " + item.producto + " pertenece a otro negocio, no lo podemos agregar";
            }

        }, function () {
            alert("Error Occur");
            });
    };

    $scope.alertmsg = function () {
        $("#alertModal").modal('hide');
    };

    $scope.GetProducto = function () {
        //alert(":s")
        var response = ProductoService.GetDataProductos();

        response.then(function (response) {
            $scope.productos = response.data;
            alert(productos);
        }, function () {
            //alert("Error Occur");
        });
    };

    $scope.GetData = function (item) {
        //alert(item.idNegocio)
        var response = ProductoService.GetProductos(item);
        response.then(function (response) {
            $scope.productos = response.data;
            //var response2 = NegocioService.GetProdNegocios();
        }, function () {
            //alert("Error Occur");
        });
    };



    $scope.traerCategorias = function () {
        var response = CategoriaService.traerCategorias();
        response.then(function (response) {
            $scope.categorias = response.data;
            //var response2 = NegocioService.GetProdNegocios();
        }, function () {
            //alert("Error Occur");
        });

    }; 

    $scope.SeleccionarCategoria = function (idCat) {
        var response = CategoriaService.seleccionarCategoria(idCat);
        response.then(function (response) {
            $scope.categorias = response.data;
            //var response2 = NegocioService.GetProdNegocios();
        }, function () {
            //alert("Error Occur");
        });

    }
}