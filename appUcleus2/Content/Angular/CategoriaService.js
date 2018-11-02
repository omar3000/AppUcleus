angular
    .module('myApp')
    .service("CategoriaService", PeticionesCategorias);

function PeticionesCategorias($http) {

    this.traerCategorias = function () {
        var response = $http({
            method: "post",
            url: "/Categoria/traerCategorias",
            datatype: "json",
        });

        return response;
    };

    this.seleccionarCategoria = function (idCat) {
        var response = $http({
            method: "post",
            url: "/Categoria/seleccioarCategoria",
            datatype: "json",
            data: "{idCat:" + idCat + "}"
        });

        return response;
    }
}