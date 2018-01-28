
const app = angular.module('happyhour', []);
app.controller('MainController', ['$http', function($http){
  this.cities = [];
  this.cats = [];
  this.showCatPage = false;
  this.showCityPage = true;
  this.showBarPage = false;
  this.showShowPage = false;
  this.editform = false;
  this.cityID = 0;
  this.catsID = 0;
  this.oneBarID = 0;
  this.findBars = [];
  this.reviews = [];
  this.newbar = [];
  this.formdata = {};
  this.updateform = {};
  this.barform = {};

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
    console.log(cat.id)
    this.catID = cat.id
    console.log(cat)
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
    console.log(bar.id)

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
  };


  this.addReview = () => {
    $http({
      url: 'http://localhost:3000/' + 'cities/' + this.cityID + '/categories/' + this.catID + '/bars/' + this.barOne.iD + '/reviews',
      method: 'POST',
      data: {
        name: this.formdata.name,
        content: this.formdata.content,
        rating: this.formdata.rating,
        bar_id: this.barOne.id
      }
    }).then(response => {
      console.log('response: ', response.data);
      console.log(this.formdata);
      this.newreview = response.data
      console.log(this.barOne.reviews);
      this.barOne.reviews.push(this.newreview);
      console.log(this.newreview);
      this.getReviews(this.barOne);
      this.formdata = {};
    }).catch(err => {
      console.error(err.message);
    });
  };
  this.addBar = ()=> {
    console.log("CLICK")
    $http({
      url: 'http://localhost:3000/' + 'cities/' + this.cityID + '/categories/' + this.catID + '/bars/',
      method: 'POST',
      data: {
        name: this.barform.name,
        img_url: this.barform.img_url,
        special: this.barform.special,
        time: this.barform.time,
        category_id: this.catID
      }
    }).then(response => {
      console.log(response.data);
      console.log(this.barform)
      this.newbar = response.data;
      console.log(this.newbar);
      this.findBars.push(this.newbar);
    }).catch(err => {
      console.error(err.message);
    });
  }

  this.deleteReview = (rev) => {
    $http({
      url: 'http://localhost:3000/' + 'cities/' + this.cityID + '/categories/' + this.catID + '/bars/' + this.barOne.iD + '/reviews/' + rev ,
      method: 'DELETE',
    }).then(response => {
      console.log(response.data)
      this.getReviews(this.barOne);
    }).catch(err=> console.error(err.message));

  };
this.editReview = (id) => {
  console.log("clickkkkk");
  console.log(this.editOne);
  $http({
    url: 'http://localhost:3000/' + 'cities/' + this.cityID + '/categories/' + this.catID + '/bars/' + this.barOne.id + '/reviews/' + this.editOne,
    method: 'PUT',
    data: {
      name: this.updateform.name,
      content: this.updateform.content,
      rating: this.updateform.rating,
      bar_id: this.barOne.id
    }
  }).then(response => {
    console.log(response.data)
    this.getReviews(this.barOne);
  }).catch(err=>console.error(err.message));
}


}]);
