
const app = angular.module('happyhour', []);
app.controller('MainController', ['$http', function($http){
  this.cities = [];

  this.getAllCities = () => {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/cities'
    }).then(response=> {
      console.log(response.data);
      this.cities = response.data;
    }).catch(reject => {
      console.log('reject: ', reject)
    });
  };
  this.getAllCities();
}]);
