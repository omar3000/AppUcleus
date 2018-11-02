angular
    .module('myApp')
    .service("VentaAdminService", PeticionesVentas);

function PeticionesVentas($http) {

    this.PedidosNegocio = function () {
        var response = $http({
            method: "get",
            url: "/Negocios/Ventas/PedidosNegocio"
        });

        return response;
    };

    this.TraerPedido = function (idVenta) {
        var response = $http({
            method: "post",
            url: "/Negocios/Ventas/TraerPedido",
            datatype: "json",
            data: "{idV:" + idVenta + "}"
        });

        return response;
    };

    this.traerCantidad = function (idPro, idVenta) {

        var response = $http({
            method: "post",
            url: "/Negocios/Ventas/traerCantidad",
            datatype: "json",
            data: "{idPro:" + idPro + ", idVe:" + idVenta + " }"
        });

        return response;
    };
}