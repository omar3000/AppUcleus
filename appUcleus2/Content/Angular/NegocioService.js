
angular
    .module('myApp')
    .service("NegocioService", PeticionesNegocio);

function PeticionesNegocio($http) {
    this.GetAllNegocios = function () {

        var response = $http({
            method: "post",
            url: "/Neg/GetAllnegocios",
            datatype: "json",
        });

        return response;
    };

    this.algoritmoRecomendaciones = function () {
        var response = $http({
            method: "post",
            url: "/Neg/algoritmoRecomendaciones",
            datatype: "json",
        });

        return response;
    };


    this.traerNegocio2 = function () {

        var response = $http({
            method: "get",
            url: "/Neg/traerNegocio"
        });

        return response;
    };

    this.traerNegocio = function (idNegocio) {

        var response = $http({
            method: "post",
            url: "/Neg/traerNegocioById",
            datatype: "json",
            data: "{idNegocio:" + idNegocio + "}"
        });

        return response;
    };


}


