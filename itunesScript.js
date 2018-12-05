//document.getElementById('searchButton').onclick = function() {
//  console.log(true);
//  var data = document.getElementById('jsPostData').value;
//  console.log(data);
//};
document.getElementById('searchInput').value = ""

var resultsArray = [];
var searchTerms = "";
var dataResults = "";
var url = "https://itunes.apple.com/search?limit=50&term=";
var table = document.getElementById("resultsTable");
var songIndexNum = 0;

function searchAPI(songIndex = 0) {
  searchTerms = document.getElementById('searchInput').value;
  searchTerms = searchTerms.replace(" ", "+");
  url = "https://itunes.apple.com/search?limit=50&term="
  url+=searchTerms;
  $.getJSON(url,function(data){
    $.each(data, function(key, val) {
    $("#resultsTable tr").remove();
      if (val.length >= 1) {
        for (i = songIndex; i < songIndex+10; i++) {
          var newArray = val.filter(function (el) {
            if(el.artistName !== undefined && el.trackName !== undefined)  {
              return true;
            } else {
              return false;
            }
          });
          if (newArray[i] === undefined) {
            var row = table.insertRow();
            row.innerHTML = "No more results..."
            break;
          }
          var row = table.insertRow();
          row.innerHTML = "<td>"+(i+1)+". "+newArray[i].artistName+" - "+newArray[i].trackName+"<br>"+"<a href='"+newArray[i].previewUrl+"'>Preview</a>"+"<center><img src='"+newArray[i].artworkUrl100+"' alt='Album Art' height='200' width='200'></center></td>";
        }
      } else if (val.length < 1) {
        var row = table.insertRow();
        row.innerHTML = "No results..."
      }
    });
  });
}

document.getElementById('searchButton').onclick = function() {
  songIndexNum = 0;
  searchAPI(songIndexNum);
}

document.getElementById('nextButton').onclick = function() {
  songIndexNum += 10
  if (songIndexNum >= 40) {
    songIndexNum = 40
  }
  searchAPI(songIndexNum);
}

document.getElementById('prevButton').onclick = function() {
  songIndexNum -= 10
  if (songIndexNum <= 0) {
    songIndexNum = 0
  }
  searchAPI(songIndexNum);
}

document.getElementById('page1').onclick = function() {
  songIndexNum = 0;
  searchAPI(songIndexNum);
}

document.getElementById('page2').onclick = function() {
  songIndexNum = 10;
  searchAPI(songIndexNum);
}

document.getElementById('page3').onclick = function() {
  songIndexNum = 20;
  searchAPI(songIndexNum);
}

document.getElementById('page4').onclick = function() {
  songIndexNum = 30;
  searchAPI(songIndexNum);
}

document.getElementById('page5').onclick = function() {
  songIndexNum = 40;
  searchAPI(songIndexNum);
}
