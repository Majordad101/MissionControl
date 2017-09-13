angular.module('MissionControlApp', ['ngRoute', 'ui.bootstrap', 'ui.utils']).config(config);

function config($routeProvider){
    $routeProvider
        //home page
        .when('/', {
            templateUrl: 'angular-app/home/home.html'
        })

        //home page
        .when('/home', {
            templateUrl: 'angular-app/home/home.html'
        })

        // project page
        .when('/projects', {
            templateUrl: 'angular-app/project/project.html',
            controller: 'ProjectController',
            controllerAs: 'vm'
        })

        // addins page
        .when('/addins', {
            templateUrl: 'angular-app/addins/addins.html',
            controller: 'AddinsController',
            controllerAs: 'vm'
        })

        // add project
        .when('/projects/add', {
            templateUrl: 'angular-app/add-project/add-project.html',
            controller: 'AddProjectController',
            controllerAs: 'vm'
        })

        // edit project
        .when('/projects/edit/:projectId', {
            templateUrl: 'angular-app/edit-project/edit-project.html',
            controller: 'EditProjectController',
            controllerAs: 'vm'
        })

        //show configuration
        .when('/projects/configurations/:projectId', {
            templateUrl: 'angular-app/configuration/configuration.html',
            controller: 'ConfigController',
            controllerAs: 'vm'
        })

        //add configuration
        .when('/configurations/add/:projectId', {
            templateUrl: 'angular-app/add-configuration/add-configuration.html',
            controller: 'AddConfigController',
            controllerAs: 'vm'
        })
        // Health report main page
        .when('/projects/healthreport/:projectId', {
            templateUrl: 'angular-app/health-report/health-report.html',
            controller: 'HealthReportController',
            controllerAs: 'vm'
        })
}