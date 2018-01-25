
const app = angular.module('happyhour', []);
app.controller('MainController', ['$http', function($http){
  this.cities = [];
  this.cats = [];
  this.showCatPage = false;
  this.showCityPage = true;
  this.cityID = 0;
  this.catsID = 0;
  this.findBars = [];

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

    this.showCategories = (city) => {
      console.log(this.cityID)
      this.cityID = city.id
      $http({
        method: 'GET',
        url: 'http://localhost:3000/cities/' + this.cityID
      }).then(response => {
        this.cats = response.data.categories;
        console.log(this.cats)
        this.categories =
        // console.log(this.oneMovie);

        this.showCatPage = true;
        this.showCityPage = false;
      }).catch(err => console.log(err));
    };

      this.showBars = (cat) => {
        console.log(this.cityID)
        console.log(cat.id)
        this.cityID
        this.catsID
        $http({
          method: 'GET',
          url: 'http://localhost:3000/' + 'cities/' + this.cityID + '/categories/' + cat.id
        }).then(response => {
          console.log("DO SOMETHING")
          // this.bars = response.data.categories;
          this.findBars = response.data;
          console.log(this.findBars);
          this.showCatPage = true;
          this.showCityPage = false;
        }).catch(err => console.log(err));
      };






}]);
