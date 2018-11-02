

app.controller("productosController", function ($scope, $http) {
    debugger;
    $scope.InsertData = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");
        if (Action == "Submit") {
            $scope.Producto = {};
            $scope.Producto.producto = $scope.producto;
            $scope.Producto.descripcion = $scope.descripcion;
            $scope.Producto.imgProducto = $scope.imgProducto;
            $scope.Producto.precio = $scope.precio;

            $http({
                method: "post",
                url: "http://localhost:50251/Home/Insert_Producto",
                datatype: "json",
                data: JSON.stringify($scope.Producto)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.producto = "";
                $scope.descripcion = "";
                $scope.imgProducto = "";
                $scope.precio = "";
            })
        } else {
            $scope.Producto = {};
            $scope.Producto.producto = $scope.producto;
            $scope.Producto.descripcion = $scope.descripcion;
            $scope.Producto.imgProducto = $scope.imgProducto;
            $scope.Producto.precio = $scope.precio;
            $scope.Producto.idProducto = document.getElementById("idProducto").value;
            $http({
                method: "post",
                url: "http://localhost:50251/Home/Update_Producto",
                datatype: "json",
                data: JSON.stringify($scope.Producto)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.producto = "";
                $scope.descripcion = "";
                $scope.imgProducto = "";
                $scope.precio = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Add New Productoe";
            })
        }
    }
    $scope.GetAllData = function () {
        $http({
            method: "get",
            url: "http://localhost:50251/Home/Get_AllProducto"
        }).then(function (response) {
            $scope.Productos = response.data;
        }, function () {
            alert("Error Occur");
        })
    };
    $scope.DeleteEmp = function (Neg) {
        $http({
            method: "post",
            url: "http://localhost:50251/Home/Delete_Producto",
            datatype: "json",
            data: JSON.stringify(Neg)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        })
    };
    $scope.UpdateEmp = function (Neg) {
        document.getElementById("idProducto").value = Neg.idProducto;

        $scope.producto = Neg.producto;
        $scope.descripcion = Neg.descripcion;
        $scope.imgProducto = Neg.imgProducto;
        $scope.precio = Neg.precio;

        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "Yellow";
        document.getElementById("spn").innerHTML = "Update Productoe Information";
    }
}) 