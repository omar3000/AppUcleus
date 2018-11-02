angular
    .module('myApp')
    .service("NegocioAdminService", PeticionesNegocio);

function PeticionesNegocio($http) {

    this.GetNegocio = function () {
       
        var response = $http({
            method: "get",
            url: "/Negocios/Negocios/NegocioActual"
        });

        return response;
    };

    this.InsertNegocio = function (Negocio) {
        var response = $http({
            method: "post",
            url: "/Negocios/Negocios/InsertNegocio",
            datatype: "json",
            data: JSON.stringify(Negocio)
        });

        return response;
    }

    this.UpdateNegocio = function (Negocio) {
        var response = $http({
            method: "post",
            url: "/Negocios/Negocios/UpdateNegocio",
            datatype: "json",
            data: JSON.stringify(Negocio)
        });

        return response;
    }


}