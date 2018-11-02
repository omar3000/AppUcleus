angular
    .module("myApp")
    .controller("UsuarioController", UsuarioController);  
        
function UsuarioController($scope, UsuarioService) {

    $scope.SaveUser = function () {
        var User =
        {
            nombre: $scope.fName,
            apellidoPaterno: $scope.lName,
            correo: $scope.uEmail,
            contraseña: $scope.uPwd,
            usuario: $scope.uName
        };

        var response = UsuarioService.AddUser(User);
        response.then(function (data) {
            if (data.data == "1") {
                clearFields();
                alert("User Created !");
                window.location.href = "/Home/index";
            } else if (data.data == "-1") {

                alert("user already present !");
            } else {

                clearFields();
                alert("Invalid data entered !");
            }
        });
    }

    function clearFields() {
        $scope.fName = "";
        $scope.lName = "";
        $scope.uEmail = "";
        $scope.uPwd = "";
        $scope.uName = "";
        $scope.userForm.$setPristine();
    }

    $scope.LoginCheck = function () {
        var User = {
            usuario: $scope.uName,
            contraseña: $scope.password
        };
        $("#divLoading").show();
        var getData = UsuarioService.UserLogin(User);
        getData.then(function (msg) {
            if (msg.data == "0") {
                $("#divLoading").hide();
                $("#alertModal").modal('show');
                $scope.msg = "Password Incorrect !";
            }
            else if (msg.data == "-1") {
                $("#divLoading").hide();
                $("#alertModal").modal('show');
                $scope.msg = "Username Incorrect !";
            }
            else {
                uID = msg.data;
                $("#divLoading").hide();
                window.location.href = "/Home/Index";
            }
        });
        debugger;
    }

    function clearFields() {
        $scope.uName = '';
        $scope.uPwd = '';
    }

    $scope.alertmsg = function () {
        $("#alertModal").modal('hide');
    };
}



 