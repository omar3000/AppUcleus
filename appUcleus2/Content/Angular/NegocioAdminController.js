angular
    .module("myApp")
    .controller("NegocioAdminController", NegocioAdminController)
    .config(ImgConfig); 


function ImgConfig ($mdIconProvider) {
    $mdIconProvider

        .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
        .defaultIconSet('img/icons/sets/core-icons.svg', 24);
}

function NegocioAdminController($scope, NegocioAdminService, FileUploadServiceNegocio) {
    debugger;

    $scope.currentNavItem = 'page1';

    $scope.goto = function (page) {
        //$scope.status = "Goto " + page;
    }

    $scope.project = {
        description: 'Nuclear Missile Defense System',
        rate: 500,
        special: true
    }

    $scope.GetNegocio = function () {

        var response = NegocioAdminService.GetNegocio();
        response.then(function (response) {
            $scope.nombre = response.data.nombre;
            $scope.correo = response.data.correo;
            $scope.descripcion = response.data.descripcion;
            $scope.calle = response.data.calle;
            $scope.colonia = response.data.colonia;
            $scope.ciudad = response.data.ciudad;
            $scope.numero = response.data.numero;
            $scope.permitePagosTarjeta = response.data.permitePagosTarjeta;
            $scope.codigoPostal = response.data.codigoPostal;
            //$scope.imgNegocio =  response.data.imgNegocio;
            $scope.precioEnvio = response.data.precioEnvio;

            document.getElementById("idNegocio").value = response.data.idNegocio;
        }, function () {
            alert("Error Occur");
        });
    }

    //$scope.InsertData = function () {

    //    var Action = document.getElementById("btnSave").getAttribute("value");

    //    $scope.Negocio = {};
    //    $scope.Negocio.nombre = $scope.nombre;
    //    $scope.Negocio.correo = $scope.correo;
    //    $scope.Negocio.descripcion = $scope.descripcion;
    //    $scope.Negocio.calle = $scope.calle;
    //    $scope.Negocio.colonia = $scope.colonia;
    //    $scope.Negocio.ciudad = $scope.ciudad;
    //    $scope.Negocio.numero = $scope.numero;
    //    $scope.Negocio.permitePagosTarjeta = $scope.permitePagosTarjeta;
    //    $scope.Negocio.codigoPostal = $scope.codigoPostal;
    //    //$scope.Negocio.imgNegocio = $scope.imgNegocio;
    //    $scope.Negocio.precioEnvio = $scope.precioEnvio;

    //    if (document.getElementById("idNegocio").value != 0) {
    //        $scope.Negocio.idNegocio = document.getElementById("idNegocio").value;
    //        var response = NegocioAdminService.UpdateNegocio($scope.Negocio);
    //        response.then(function (response) {
    //            alert(response.data);
    //        });
    //    }
    //    else {
    //        var response = NegocioAdminService.InsertNegocio($scope.Negocio);
    //        response.then(function (response) {
    //            alert(response.data);
    //        });
    //    }
    //}
    /////PARTE DONDE ALMACENA LAS IMAGENES /////
    $(document).on('change', '#file', function () {
        if (this.files && this.files[0]) {
            /* Creamos la Imagen*/
            var img = $('<img >');
            /* Asignamos el atributo source , haciendo uso del método createObjectURL*/
            img.attr('src', URL.createObjectURL(this.files[0]));
            /* Añadimos al Div*/
            $('#preview').append(img);
        }
    });

    // Variables
    $scope.Message = "";
    $scope.FileInvalidMessage = "";
    $scope.SelectedFileForUpload = null;
    $scope.FileDescription = "";
    $scope.IsFormSubmitted = false;
    $scope.IsFileValid = false;
    $scope.IsFormValid = false;

    //Form Validation
    $scope.$watch("f1.$valid", function (isValid) {
        $scope.IsFormValid = isValid;
    });


    // THIS IS REQUIRED AS File Control is not supported 2 way binding features of Angular
    // ------------------------------------------------------------------------------------
    //File Validation
    $scope.ChechFileValid = function (file) {
        var isValid = false;
        if ($scope.SelectedFileForUpload != null) {
            if ((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') && file.size <= (1024 * 1024)) {
                $scope.FileInvalidMessage = "";
                isValid = true;
            }
            else {
                $scope.FileInvalidMessage = "Selected file is Invalid. (only file type png, jpeg and gif and 512 kb size allowed)";
            }
        }
        else {
            $scope.FileInvalidMessage = "Image required!";
        }
        $scope.IsFileValid = isValid;
    };

    //File Select event 
    $scope.selectFileforUpload = function (file) {
        $scope.SelectedFileForUpload = file[0];
    }
    //----------------------------------------------------------------------------------------

    //Save File
    $scope.SaveFile = function () {
        $scope.IsFormSubmitted = true;
        $scope.Message = "";
        $scope.ChechFileValid($scope.SelectedFileForUpload);
        $scope.idNegocio = document.getElementById("idNegocio").value;
        if ($scope.idNegocio != 0) {
            alert("llege");
            var response = FileUploadServiceNegocio.UploadFileUpdate($scope.idNegocio,
                $scope.SelectedFileForUpload,
                $scope.nombre,
                $scope.correo,
                $scope.descripcion,
                $scope.calle,
                $scope.colonia,
                $scope.ciudad,
                $scope.numero,
                $scope.permitePagosTarjeta,
                $scope.codigoPostal,
                $scope.precioEnvio
            );
            response.then(function (response) {
                $scope.cancel();
                $scope.GetNegocio();
            }, function (e) {
                alert(e);
            });
        }
        else {
            var response = FileUploadServiceNegocio.UploadFile($scope.SelectedFileForUpload,
                $scope.nombre,
                $scope.correo,
                $scope.descripcion,
                $scope.calle,
                $scope.colonia,
                $scope.ciudad,
                $scope.numero,
                $scope.permitePagosTarjeta,
                $scope.codigoPostal,
                $scope.precioEnvio
            );
            response.then(function (d) {
                $scope.cancel();
                $scope.GetNegocio();
            }, function (e) {
                alert(e);
            });
        }
    };
    //Clear form 
    function ClearForm() {
        $scope.FileDescription = "";
        //as 2 way binding not support for File input Type so we have to clear in this way
        //you can select based on your requirement
        angular.forEach(angular.element("input[type='file']"), function (inputElem) {
            angular.element(inputElem).val(null);
        });

        $scope.f1.$setPristine();
        $scope.IsFormSubmitted = false;
    }
}

angular.module("myApp").factory('FileUploadServiceNegocio', function ($http, $q) { // explained abour controller and service in part 2

    var fac = {};
    fac.UploadFile = function (file,
        nombre,
        correo,
        descripcion,
        calle,
        colonia,
        ciudad,
        numero,
        permitePagosTarjeta,
        codigoPostal,
        precioEnvio) {
        var formData = new FormData();
        formData.append("file", file);
        //We can send more data to server using append         
        formData.append("nombre", nombre);
        formData.append("correo", correo);
        formData.append("descripcion", descripcion);
        formData.append("calle", calle);
        formData.append("colonia", colonia);
        formData.append("ciudad", ciudad);
        formData.append("numero", numero);
        formData.append("permitePagosTarjeta", permitePagosTarjeta);
        formData.append("codigoPostal", codigoPostal);
        formData.append("precioEnvio", precioEnvio);
        var defer = $q.defer();
        var response = $http.post("/Negocios/Negocios/InsertNegocio", formData,
            {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            });
        response.then(function (response) {
            alert(response.data);
        });
        return response;

    }

    fac.UploadFileUpdate = function (idNegocio,
        file,
        nombre,
        correo,
        descripcion,
        calle,
        colonia,
        ciudad,
        numero,
        permitePagosTarjeta,
        codigoPostal,
        precioEnvio) {
        var formData = new FormData();
        formData.append("idNegocio", idNegocio);
        formData.append("file", file);
        //We can send more data to server using append         
        formData.append("nombre", nombre);
        formData.append("correo", correo);
        formData.append("descripcion", descripcion);
        formData.append("calle", calle);
        formData.append("colonia", colonia);
        formData.append("ciudad", ciudad);
        formData.append("numero", numero);
        formData.append("permitePagosTarjeta", permitePagosTarjeta);
        formData.append("codigoPostal", codigoPostal);
        formData.append("precioEnvio", precioEnvio);
        var defer = $q.defer();
        alert(idNegocio);
        var response = $http.post("/Negocios/Negocios/UpdateNegocio", formData,
            {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            });
        response.then(function (response) {
            alert(response.data);
        });
        return response;

    }
    return fac;

});