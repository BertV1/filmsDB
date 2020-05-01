let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = null;




// Film {originalTitle='La Zizanie ', title='The Spat', fileExtension=Avi, releaseYear='1978', language='French'}

//  https://api.themoviedb.org/3/search/movie?api_key=4400a235d3d6337457ae97f843d8a5bb&query=La%20Zizanie&year=1978



function init() {
    console.log("loaded");
    //getConfig();
    //traverseFilmList();
    traverseFilmListUPDATED();
    //findFilm();

}
function traverseFilmList(){
    for(let i = 0; i < FilmList.Films.length;i++){
        findFilm(FilmList.Films[i].title,FilmList.Films[i].year)
    }
}
function traverseFilmListUPDATED(){
    console.log(Object.keys(Films).length);
    for(let i = 0; i < Object.keys(Films).length; i++){        
        filmDataIntoHTMLUPDATED(Films[i]);
    }
}

let countOK = 0;
let countNOTOK = 0;
let jsonCounter = 0;
let myJSONfilmdata = {};
function findFilm(filmTitle, filmReleaseYear) {
    let fetchUrl = "".concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', encodeURI(filmTitle),'&year=', parseInt(filmReleaseYear));
    fetch(fetchUrl)
    .then((fetchResult) => {
        return fetchResult.json();
    })
    .then((fetchData) => {


            if(fetchData.results.length > 1 || fetchData.results.length == 0){
                
                // console.log("FETCH NOT OK");
                // //console.log(fetchUrl);
                // console.log(filmTitle);
                // //console.log(filmReleaseYear);
                // //console.log(fetchData);
                // countNOTOK += 1;
                // console.log("COUNT = "+countNOTOK);
                
            } else { // DONE successfully fetched films in file and being displayed
                // myJSONfilmdata[jsonCounter] = fetchData.results[0];
                // jsonCounter += 1;
                // console.log(JSON.stringify(myJSONfilmdata));
            }
        })
    
}

function filmDataIntoHTML(data){

    //html = "<div><h2></h2><img src=\"\" alt=\"\"/><p></p></div>
    base = data.results[0];
    
    titleANDyear = "<div><h2>"+ base.title +" <span>" + base.release_date + "</span></h2>";
    img = "<img src=\""+ baseImageURL+ configData.poster_sizes[3] + base.poster_path +"\""+  "alt=\"" +  base.title + "\"/>";
    plot = "<p>" + base.overview + "</p></div>";
    filmFormatted = titleANDyear+img+plot;
    console.log(filmFormatted);
    
    document.getElementById('input').innerHTML+=filmFormatted; 
}

function filmDataIntoHTMLUPDATED(data){
    releasDate = data.release_date.split("-");
    if(releasDate[0] == ""){
        releasDate[0] = "n.a.";
    }
    //console.log(releasDate[0]);
    
    let baseImg = "https://image.tmdb.org/t/p/";
    let imgSizes = ["w92","w154","w185","w370_and_h556_bestv2","w342","w500","w780","original"];
    titleANDyear = "<div><h2>"+ data.original_title +" (" + releasDate[0] + ")" +"</h2><h3>" + data.title + "</h3>";
    img = "<img src=\"" + baseImg + imgSizes[3] + data.poster_path +"\""+  "alt=\"" +  data.title + "\"/>";
    plot = "<p>" + data.overview + "</p></div>";
    filmFormatted = titleANDyear+img+plot;
    document.getElementById('input').innerHTML+=filmFormatted; 
}



let getConfig = function () {
    let url = "".concat(baseURL, 'configuration?api_key=', APIKEY);
    fetch(url)
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            baseImageURL = data.images.secure_base_url;
            configData = data.images;
            //console.log('config:', data);
            //console.log('config fetched');
            //runSearch('jaws')
        })
        .catch(function (err) {
            alert(err);
        });
}

let runSearch = function (keyword) {
    let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', keyword);
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            //process the returned data
            console.log(data);
            //document.getElementById('input').innerHTML = JSON.stringify(data, null, 4);
            //work with results array...

        })
}
document.addEventListener("DOMContentLoaded", init);

