
const app = angular.module('happyhour', []);
app.controller('MainController', ['$http', function($http){
  this.cities = [];
  this.cats = [];
  this.showCatPage = false;
  this.showCityPage = true;
  this.showBarPage = false;
  this.showShowPage = false;
  this.cityID = 0;
  this.catsID = 0;
  this.barID = 0;
  this.findBars = [];
  this.findReviews = [];

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
        this.showCatPage = true;
        this.showCityPage = false;
      }).catch(err => console.log(err));
    };

      this.showBars = (cat) => {
        this.catID = cat.id
        $http({
          method: 'GET',
          url: 'http://localhost:3000/' + 'cities/' + this.cityID + '/categories/' + this.catID
        }).then(response => {


          this.findBars = response.data.bars;
          console.log(this.findBars);
          this.showBarPage = true;
          this.showCatPage = false;
          this.showCityPage = false;
        }).catch(err => console.log(err));
      };

    this.getReviews = (bar) => {


      $http({
        method: 'GET',
        url: 'http://localhost:3000/' + 'cities/' + this.cityID + '/categories/' + this.catID + '/bars/' + bar.id
      }).then(response => {
        this.name = response.data.name;
        this.special = response.data.special;
        this.time = response.data.time;
        this.img_url = response.data.img_url;
        
        this.barOne = response.data;
        this.reviews = response.data.reviews;
        this.showShowPage = true;
        this.showBarPage = false;
        this.showCatPage = false;
        this.showCityPage = false;
      }).catch(err => console.log(err));
    }



}]);
