angular
    .module('myApp')
    .service("UsuarioService", PeticionesUsuarios);

function PeticionesUsuarios($http) {

    this.AddUser = function (User) {

        var response = $http({
            method: "post",
            url: "/Usuario/AgregarUsuario",
            data: JSON.stringify(User),
            dataType: "json"
        });

        return response;
    };

    this.UserLogin = function (User) {
        var response = $http({
            method: "post",
            url: "/Usuario/Login",
            data: JSON.stringify(User),
            dataType: "json"
        });
        return response;
    }

}