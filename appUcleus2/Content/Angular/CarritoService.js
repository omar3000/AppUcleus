angular
    .module('myApp')
    .service("CarritoService", PeticionesCarrito);

function PeticionesCarrito($http) {

    this.AddCarrito = function (item) {
        var response = $http({
            method: "post",
            url: "/Venta/Insert_producto_carrito",
            datatype: "json",
            data: JSON.stringify(item)
        });

        return response;
    };

    this.traerCantidad = function(idPro){
       
        var response = $http({
            method: "post",
            url: "/Venta/traerCantidad",
            datatype: "json",
            data: "{idPro:" + idPro + "}"
        });

        return response;
    };

    this.enviarPedido = function () {
        var response = $http({
            method: "get",
            url: "/Venta/EnviarPedido"
        });

        return response;
    };


    this.ActualizarCantidad = function (idPro,cantidad) {
        
        var response = $http({
            method: "post",
            url: "/Venta/actualizarCantidad",
            datatype: "json",
            data: "{idPro:" + idPro + ", cantidad:" + cantidad + "}"
        });

        return response;
    };

    this.TraerCarrito = function () {
        var response = $http({
            method: "get",
            url: "/Venta/TraerCarrito"
        });

        return response;
    };

   
}