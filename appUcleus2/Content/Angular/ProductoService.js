angular
    .module('myApp')
    .service("ProductoService", PeticionesProductos);

function PeticionesProductos($http) {

    this.GetAllProductosNegocio = function() {
        var response = $http({
            method: "get",
            url: "/Negocios/Productos/ProductosNegocio"
        });

        return response;
    };

    this.GetProductos = function (Product) {
        //alert(Product);
        var response = $http({
            method: "post",
            url: "/Prod/GetData",
            datatype: "json",
            data: JSON.stringify(Product)
        });

        return response;
    };


    this.GetDataProductos = function () {

        var response = $http({
            method: "post",
            url: "/Prod/GetProductosNegocio",
            datatype: "json",
        });

        return response;
    };


    this.UpdateProducto = function (Product) {

        var response = $http({
            method: "post",
            url: "/Negocios/Productos/Update_producto",
            datatype: "json",
            data: JSON.stringify(Product)
        });

        return response; 
    };

    this.InsertProducto = function (Product) {

        var response = $http({
            method: "post",
            url: "/Negocios/Productos/Insert_producto",
            datatype: "json",
            data: JSON.stringify(Product)
        });

        return response;
    };

    this.ChangeStatusProducto = function (Product) {
        var response = $http({
            method: "post",
            url: "/Negocios/Productos/cambiarEstatusProducto",
            datatype: "json",
            data: JSON.stringify(Product)
        });

        return response;
    }
}