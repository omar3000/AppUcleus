var app = angular.module("my-app", ['ngMaterial']);



app.controller('myCtrl2', function ($scope, $mdDialog) {
    $scope.status = '  ';
    $scope.customFullscreen = false;

    $scope.showAlert = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('This is an alert title')
                .textContent('You can specify some description text in here.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got t!')
                .targetEvent(ev)
                .hasBackdrop(false)
        );
    };

    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog1.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };

       
    }


});

app.controller("myCtrl", function ($scope, $http) {
    debugger;

    $scope.InsertData = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");
        if (Action == "Submit") {
            $scope.Negocio = {};
            $scope.Negocio.nombre = $scope.nombre;
            $scope.Negocio.descripcion = $scope.descripcion;
            $scope.Negocio.calle = $scope.calle;
            $scope.Negocio.colonia = $scope.colonia;
            $scope.Negocio.ciudad = $scope.ciudad;
            $scope.Negocio.numero = $scope.numero;
            $scope.Negocio.codigoPostal = $scope.codigoPostal;
            $scope.Negocio.imgNegocio = $scope.imgNegocio;
            $scope.Negocio.precioEnvio = $scope.precioEnvio;

            $http({
                method: "post",
                url: "http://localhost:50251/Home/Insert_Negocio",
                datatype: "json",
                data: JSON.stringify($scope.Negocio)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.nombre = "";
                $scope.descripcion = "";
                $scope.calle = "";
                $scope.colonia = "";
                $scope.ciudad = "";
                $scope.numero = "";
                $scope.codigoPostal = "";
                $scope.imgNegocio = "";
                $scope.precioEnvio = "";
            })
        } else {
            $scope.Negocio = {};
            $scope.Negocio.nombre = $scope.nombre;
            $scope.Negocio.descripcion = $scope.descripcion;
            $scope.Negocio.calle = $scope.calle;
            $scope.Negocio.colonia = $scope.colonia;
            $scope.Negocio.ciudad = $scope.ciudad;
            $scope.Negocio.numero = $scope.numero;
            $scope.Negocio.codigoPostal = $scope.codigoPostal;
            $scope.Negocio.imgNegocio = $scope.imgNegocio;
            $scope.Negocio.precioEnvio = $scope.precioEnvio;
            $scope.Negocio.idNegocio = document.getElementById("idNegocio").value;
            $http({
                method: "post",
                url: "http://localhost:50251/Home/Update_Negocio",
                datatype: "json",
                data: JSON.stringify($scope.Negocio)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.nombre = "";
                $scope.descripcion = "";
                $scope.calle = "";
                $scope.colonia = "";
                $scope.ciudad = "";
                $scope.numero = "";
                $scope.codigoPostal = "";
                $scope.imgNegocio = "";
                $scope.precioEnvio = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Add New Negocioe";
            })
        }
    }
    $scope.GetAllData = function () {
        $http({
            method: "get",
            url: "http://localhost:50251/Home/Get_Allnegocio"
        }).then(function (response) {
            $scope.negocios = response.data;
        }, function () {
            alert("Error Occur");
        })
    };
    $scope.DeleteEmp = function (Neg) {
        $http({
            method: "post",
            url: "http://localhost:50251/Home/Delete_Negocio",
            datatype: "json",
            data: JSON.stringify(Neg)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        })
    };
    $scope.UpdateEmp = function (Neg) {
        document.getElementById("idNegocio").value = Neg.idNegocio;

        $scope.nombre = Neg.nombre;
        $scope.descripcion =   Neg.descripcion;
        $scope.calle = Neg.calle;
        $scope.colonia = Neg.colonia;
        $scope.ciudad = Neg.ciudad;
        $scope.numero = Neg.numero;
        $scope.codigoPostal = Neg.codigoPostal;
        $scope.imgNegocio = Neg.imgNegocio;
        $scope.precioEnvio = Neg.precioEnvio;

        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "Yellow";
        document.getElementById("spn").innerHTML = "Update Negocioe Information";
    }
})  