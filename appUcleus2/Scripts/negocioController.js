angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

var app = angular.module('MyApp')

app.controller('AppCtrl', function ($scope) {
    $scope.imagePath = 'http://hablemosdeculturas.com/wp-content/uploads/2017/11/Comida-mexicana-14.jpg';
    $scope.Negocio = [
        {
            idNegocio: 2,
            nombre: "tacos",
            imagen: 'https://www.cocinavital.mx/wp-content/uploads/2017/09/tacos-de-lengua-de-res-caseros.jpg'
        },
        {
            idNegocio: 3,
            nombre: "hamburguesa",
            imagen: 'https://marinalia.es/1231-thickbox_default/benidorm-asador-la-salamadra-hamburguesa-gourmet-ensalada-postre.jpg'
        },
        {
            idNegocio: 1,
            nombre: "quesadillas",
            imagen: 'https://www.vvsupremo.com/wp-content/uploads/2015/11/900X570_Chorizo-Quesadillas-With-Poblano-Peppers.jpg'
        },
        {
            idNegocio: 7,
            nombre: "pan",
            imagen: 'https://img.recetascomidas.com/recetas/320_240/pan-dulce-mexicano.jpg'
        },
        {
            idNegocio: 5,
            nombre: "carne asada",
            imagen: 'https://images-gmi-pmc.edge-generalmills.com/cc1e665a-027a-42e1-8e8a-9b27eaf358b9.jpg'
        },
    ];
    });

app.directive("crearCard", function ($compile) {
    return function (scope, element, attrs) {
        element.bind("click", function () {
            angular.element(document.getElementById('CardBoton')).append($compile("<md-dialog-actions layout='row'> <md-card md-theme='{{ showDarkTheme ? 'dark-orange' : 'default' }}' md-theme-watch> <md-card-title> <md-card-title-text> <span class='md-headline'>Negocio 1</span> <span class='md-subhead'>Extra</span> </md-card-title-text> </md-card-title> <md-card-content layout='row' layout-align='space-between'> <div class='md-media-xl card-media'> <img ng-src='{{imagePath}}' class='md-card-image' width='300' height='250'> </div> <md-card-actions layout='column'> <md-button class='md-icon-button' aria-label='Favorite'> <md-icon md-svg-icon='img/icons/favorite.svg'></md-icon> </md-button> <md-button class='md-icon-button' aria-label='Settings'> <md-icon md-svg-icon='img/icons/menu.svg'></md-icon> </md-button> <md-button class='md-icon-button' aria-label='Share'> <md-icon md-svg-icon='img/icons/share-arrow.svg'></md-icon> </md-button> </md-card-actions> </md-card-content> </md-card> </md-dialog-actions>")(scope));
            //podemos añadirle al botón directivas, estilos y funciones de ng, gracias al método $compile de angular
        });
    };
});
