// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA1SGhU7-cunQ7VIrCmAVWSYHfe9-FLb6w",
    authDomain: "foodanalyser.firebaseapp.com",
    databaseURL: "https://foodanalyser.firebaseio.com",
    projectId: "foodanalyser",
    storageBucket: "foodanalyser.appspot.com",
    messagingSenderId: "67786128135",
    appId: "1:67786128135:web:c5de525f78d13905"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



//javascript codes for the allergic_details.html. This js file contains the retrieval of the data to the page
function searchENumbers() {

  //=========================
  var db = firebase.firestore();
  //=========================

  // This points to the collection called 'Dessert'
  var collectionReference = db.collection('Dessert');
  
  var ins = document.getElementById("ins").value;

  if (ins == ""){
    alert("Please enter a valid ingredient! Example: E321")
  }else{
    var query = collectionReference.where("pv", "array-contains", ins);
    
    query.get().then(function(querySnapshot) {
      // check and do something with the data here.
      if (querySnapshot.empty) {
        document.getElementById('dataTableDiv').innerHTML = '<p class="h4 text-center">Sorry No Results to Display!</p>';
      } else {
        // do something with the data
        // go through all the results
      var tableTemplate = '<table class="table table-striped table-dark" id="dataTable"><thead><tr><th scope="col">Name</th><th scope="col">Preservatives</th></tr></thead><tbody>';
      var tableBody = '';
      querySnapshot.forEach(function (documentSnapshot) {
      var data = documentSnapshot.data();
      // do something with the data of each document.
      name = JSON.stringify(data.name);
      preservatives = data.pv;

      var pvString = '';
      preservatives.forEach(function(item){
        
        if (item != ins){
          pvString += '<span>' + item + '&nbsp; &nbsp; &nbsp; </span>';
        }else{
          pvString += '<span style="color:red">' + item + '&nbsp; &nbsp; &nbsp; </span>';
        }
        
      });

      tableBody += '<tr><td>' + JSON.parse(name) + '</td><td>' + pvString + '</td></tr>';
      });
      var tableFooter = '  </tbody></table>';
      document.getElementById('dataTableDiv').innerHTML = tableTemplate+tableBody+tableFooter;
      }
    });
  }
}
//end of js file to the allergic_details.html file



// const items = [1, 29, 47];
// const copy = [];

// items.forEach(function(item){
//   copy.push(item*item);
// });
// print(copy);