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
  var collectionReferenceBeverages = db.collection('Beverages');
  
  var ins = document.getElementById("ins").value;

  if (ins == ""){
    alert("Please enter a valid ingredient! Example: E321")
  }else{
    var query = collectionReference.where("pv", "array-contains", ins);
    var queryBeverages = collectionReferenceBeverages.where("pv", "array-contains", ins);
    
    var tableTemplate = '<table class="table table-striped table-dark" id="dataTable"><thead><tr><th scope="col">Name</th><th scope="col">Preservatives</th></tr></thead><tbody>';
    var tableBody = '';

    var bigArray = [];
    var checkDocsOne = 0;
    var checkDocsTwo = 0;

    query.get().then(function(querySnapshot) {
      // check and do something with the data here.
      if (querySnapshot.empty) {
        checkDocsOne = 0;
      } else {
        // do something with the data
        // go through all the results
        checkDocsOne = 1;
      
        querySnapshot.forEach(function (documentSnapshot) {
        var data = documentSnapshot.data();
        // do something with the data of each document.
          bigArray.push(data);
        });
        
      }
    });
    

    queryBeverages.get().then(function(querySnapshot) {
      // check and do something with the data here.
      if (querySnapshot.empty) {
        checkDocsTwo = 0;
      } else {
        // do something with the data
        // go through all the results
        checkDocsTwo = 1;
      
        querySnapshot.forEach(function (documentSnapshot) {
        var data = documentSnapshot.data();
        // do something with the data of each document.
          bigArray.push(data);
        });
        
      }
    });
    
    setTimeout(function(){
      if ((checkDocsOne + checkDocsTwo) == 1 || (checkDocsOne + checkDocsTwo) == 2 ){
        bigArray.forEach(function (item) {
        name = JSON.stringify(item.name);
        preservatives = item.pv;

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
        var tableFooter = '</tbody></table>';
        document.getElementById('filterInput').style.visibility = 'visible';
        document.getElementById("filterInput").focus();
        document.getElementById('dataTableDiv').innerHTML = tableTemplate + tableBody + tableFooter;
      }else{
        document.getElementById("ins").focus();
        document.getElementById('filterInput').style.visibility = 'hidden';
        document.getElementById('dataTableDiv').innerHTML = '<p class="h4 text-center">Sorry No Results to Display!</p>';
      }
    }, 1000);

  }
}
//end of js file to the allergic_details.html file


//start of filter list function
function filterIt() {
  // Declare variables 
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filterInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("dataTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}
//end of filter list funciton


