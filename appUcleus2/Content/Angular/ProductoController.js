angular
    .module("myApp")
    .controller("ProductoController", ProductoController);  

function ProductoController($scope, $http, $mdDialog, $interval, ProductoService, CategoriaService, FileUploadService) {
    var imagePath = 'img/list/60.jpeg';

    $scope.theme = 'red';

    var isThemeRed = true;

    $scope.GetAllData = function () {
        var response = ProductoService.GetAllProductosNegocio();
        response.then(function (response) {
            $scope.productos = response.data;
            
        }, function () {
            alert("Error Occur");
        })
    };


    $scope.showAdvanced = function (ev, item) {
        $mdDialog.show({
            controller: DialogController,
            locals: {
                item: item,
                CategoriaService: CategoriaService
            },
            templateUrl: 'dialog1.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    function DialogController($scope, $mdDialog, $http, item, CategoriaService) {

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };

        $scope.GetProducto = function () {
            $scope.traerCategorias();
            $scope.producto = item.producto;
            $scope.descripcion = item.descripcion;
            //$scope.imgProducto = response.data.imgProducto;
            $scope.precio = item.precio;
            $scope.idProducto = item.idProducto;
            
        };

        $scope.traerCategorias = function () {
            var response = CategoriaService.traerCategorias();
            response.then(function (response) {
                $scope.categorias = response.data;
                //var response2 = NegocioService.GetProdNegocios();
            }, function () {
                //alert("Error Occur");
            });

        }; 
    }

    //$scope.InsertData = function (idProducto = 0) {

    //    var Product =
    //    {
    //        idProducto: idProducto,
    //        producto: $scope.producto,
    //        precio: $scope.precio,
    //        descripcion: $scope.descripcion,
    //        fkCategoria: $scope.fkCategoria
    //        //imgNegocio: $scope.imgNegocio
    //    };

    //    if (idProducto != 0) {
    //        var response = ProductoService.UpdateProducto(Product);
    //        response.then(function (response) {
    //            alert(response.data);
    //            $scope.cancel();
    //            $scope.GetAllData();
    //        });
    //    }
    //    else {
    //        var response = ProductoService.InsertProducto(Product);
    //        response.then(function (response) {
    //            alert(response.data);
    //            $scope.cancel();
    //            $scope.GetAllData();
    //        });
    //    }
    //};

    $scope.onChange = function (pro) {

        if (pro != null) {
            var Product =
                {
                    idProducto: pro.idProducto,
                    activo: pro.activo
                };

            var response = ProductoService.ChangeStatusProducto(Product);
            response.then(function (response) {
                //alert(response.data);
                $scope.cancel();
                $scope.GetAllData();
            });
        }
    };

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
    $scope.SaveFile = function (idProducto = 0) {
        $scope.IsFormSubmitted = true;
        $scope.Message = "";
        $scope.ChechFileValid($scope.SelectedFileForUpload);
        if (idProducto != 0) {
            var response = FileUploadService.UploadFileUpdate(idProducto,
                $scope.SelectedFileForUpload,
                $scope.producto,
                $scope.descripcion,
                $scope.precio,
                $scope.fkCategoria
            );
            response.then(function (response) {
                //alert("llego");
                $scope.cancel();
                $scope.GetAllData();
                //ClearForm();
            }, function (e) {
                alert(e);
            });
        }
        else {
            var response = FileUploadService.UploadFile(idProducto,
                $scope.SelectedFileForUpload,
                $scope.producto,
                $scope.descripcion,
                $scope.precio,
                $scope.fkCategoria
            );
            response.then(function (response) {
                $scope.cancel();
             
                var response = ProductoService.GetAllProductosNegocio();
                response.then(function (response) {
                    $scope.productos = response.data;
                 
                }, function () {
                    alert("Error Occur");
                    })

                //ClearForm();
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
};

angular.module("myApp").factory('FileUploadService', function ($http, $q) { // explained abour controller and service in part 2

    var fac = {};
    fac.UploadFile = function (idProducto,
        file,
        producto,
        descripcion,
        precio,
        fkCategoria) {
        var formData = new FormData();
        formData.append("idProducto", idProducto);
        formData.append("file", file);
        //We can send more data to server using append  
        formData.append("producto", producto);
        formData.append("descripcion", descripcion);
        formData.append("precio", precio);
        formData.append("fkCategoria", fkCategoria);
        var defer = $q.defer();
        var response = $http.post("/Negocios/Productos/Insert_producto", formData,
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

    fac.UploadFileUpdate = function (idProducto,
        file,
        producto,
        descripcion,
        precio,
        fkCategoria) {
        var formData = new FormData();
        formData.append("idProducto", idProducto);
        formData.append("file", file);
        //We can send more data to server using append  
        formData.append("producto", producto);
        formData.append("descripcion", descripcion);
        formData.append("precio", precio);
        formData.append("fkCategoria", fkCategoria);
        var defer = $q.defer();
        var response = $http.post("/Negocios/Productos/Update_producto", formData,
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