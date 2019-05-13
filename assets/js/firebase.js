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
  var e321 = false;
  var e125 = false;
  var e200 = false;
  var e100 = false;

  //=========================
  var db = firebase.firestore();
  //=========================

  if (document.getElementById("e321").checked == true){
    e321 = true;
  }
  if (document.getElementById("e125").checked == true){
    e125 = true;
  }
  if (document.getElementById("e200").checked == true){
    e200 = true;
  }
  if (document.getElementById("e100").checked == true){
    e100 = true;
  }



  // This points to the collection called 'Dessert'
  var collectionReference = db.collection('Dessert');
  if (e321 == true){
    var query = collectionReference.where("pv", "array-contains", "E321"); 
  }
  else if (e125 == true){
    var query = collectionReference.where("pv", "array-contains", "E125"); 
  }
  else if (e200 == true){
    var query = collectionReference.where("pv", "array-contains", "E200"); 
  }
  else if (e100 == true){
    var query = collectionReference.where("pv", "array-contains", "E100"); 
  }
  

  
  query.get().then(function(querySnapshot) {
    // check and do something with the data here.
    if (querySnapshot.empty) {
      console.log('no documents found');
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
    console.log(name, preservatives);
    tableBody += '<tr><td>' + JSON.parse(name) + '</td><td>' + preservatives.join(", ") + '</td></tr>';
    });
    var tableFooter = '  </tbody></table>';
    document.getElementById('dataTableDiv').innerHTML = tableTemplate+tableBody+tableFooter;
    }
  });






}




//end of js file to the allergic_details.html file



