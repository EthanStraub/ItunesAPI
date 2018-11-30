//document.getElementById('searchButton').onclick = function() {
//  console.log(true);
//  var data = document.getElementById('jsPostData').value;
//  console.log(data);
//};
document.getElementById('searchInput').value = ""
var dataResults = "";
var resultsArray = [];
var searchTerms = ""
var url = "https://itunes.apple.com/search?term="
var hasSearched = false;

var table = document.getElementById("resultsTable");


document.getElementById('searchButton').onclick = function() {
  searchTerms = document.getElementById('searchInput').value;
  searchTerms = searchTerms.replace(" ", "+");
  url+=searchTerms;
  $.getJSON(url,function(data){
    $.each(data, function(key, val) {
      if(key === "results") {
           //console.log(key);
        for (i = 0; i < val.length; i++) {
          console.log(val[i].trackName)
          var row = table.insertRow([i]);
          row.innerHTML = (i+1)+". "+val[i].trackName;
        }
        for (i = 0; i < val.length; i++) {
        console.log(val[i].trackName)
           resultsArray.push(" "+val[i].trackName)
        }
        hasSearched = true;
        //console.log("TEST");
        //console.log(resultsArray);
        //resultsArray = resultsArray.toString();
        //resultsArray = resultsArray.replace(/,\s?/g, " ");
        document.getElementById('resultsBox').innerHTML = "Results: "+resultsArray;
        //console.log("TEST");
        //console.log(resultsArray);
    } else {
      table.innerHTML = "No results..."
    }
    });
  });
  //if (hasSearched) {
    url = "https://itunes.apple.com/search?term="
    searchTerms = "";
    resultsArray = [];
    var parent = document.getElementById(resultsTable);
    while(parent.hasChildNodes())
    {
       parent.removeChild(parent.firstChild);
    }
    //hasSearched = false;
  //}

}
