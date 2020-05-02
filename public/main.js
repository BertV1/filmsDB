let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = null;
const APIKEY = "4400a235d3d6337457ae97f843d8a5bb";
let FetchNULLRESULTARR = [];


// Film {originalTitle='La Zizanie ', title='The Spat', fileExtension=Avi, releaseYear='1978', language='French'}

//  https://api.themoviedb.org/3/search/movie?api_key=4400a235d3d6337457ae97f843d8a5bb&query=La%20Zizanie&year=1978



function init() {
    console.log("loaded");
    getConfig();
    //traverseFilmList();
    traverseFilmListUPDATED();
    //findFilm();

}
function traverseFilmList() {
    for (let i = 0; i < FilmList.Films.length; i++) {
        findFilm(FilmList.Films[i].title, FilmList.Films[i].year);
        
    }
}



function traverseFilmListUPDATED() {
    console.log(Object.keys(FilmsReal).length);
    for (let i = 0; i < Object.keys(FilmsReal).length; i++) {
        filmDataIntoHTMLUPDATED(FilmsReal[i]);
    }
}

let countOK = 0;
let countNOTOK = 0;
// temp vars so we can copy it manually to file later
let myJSONfilmdata = {};
let jsonCounter = 197;
let = amountOfFetchableNewFilms = 0;


function findFilm(filmTitle, filmReleaseYear) {
    let fetchUrl = "".concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', encodeURI(filmTitle), '&year=', parseInt(filmReleaseYear));
    fetch(fetchUrl)
        .then((fetchResult) => {
            return fetchResult.json();
        })
        .then((fetchData) => {


            if (fetchData.results === undefined || fetchData.results.length == 0) {

                console.log("ORIGINAL -- "+filmTitle);
                console.log(fetchData.results);

                // fetchData.results.length > 1 || 
                console.log("FETCH NOT OK");
                //console.log(fetchUrl);
                //console.log(filmReleaseYear);
                //console.log(fetchData);
                //countNOTOK += 1;
                //console.log("COUNT = "+countNOTOK);
                for (let i = 0; i < FilmList.Films.length; i++) {
                    
                    if (FilmList.Films[i].title == filmTitle) {
                        //console.log(FilmList.Films[i].title);
                        
                        findFilm(FilmList.Films[i].translatedTitle, filmReleaseYear);

                    }
                }


            } else { // DONE successfully fetched films in file and being displayed
                // myJSONfilmdata[jsonCounter] = fetchData.results[0];
                // jsonCounter += 1;
                // console.log(JSON.stringify(myJSONfilmdata));
                if (fetchData.results.length == 1) {
                    
                    console.log("FILMS REAL DOES HAVE LENGTH, DOES IT NOT????????? ==> "+FilmsReal.length);
                    

                    let match = false;
                    for (let i = 0; i < Object.keys(FilmsReal).length; i++) {
                        
                        
                        if (FilmsReal[i].translatedTitle == fetchData.results[0].title || FilmsReal[i].title == fetchData.results[0].title) {
                            match = true;
                            console.log("film already in filmdata list");
                            break;
                            
                        }
                    }
                    
                    if (!match) {
                        myJSONfilmdata[jsonCounter] = fetchData.results[0];
                        jsonCounter += 1;
                        amountOfFetchableNewFilms += 1;
                        console.log("a new film; amount of fetchable new films: "+ amountOfFetchableNewFilms);
                        
                    }
                    console.log(JSON.stringify(myJSONfilmdata));

                }
            }
        })

}

function filmDataIntoHTML(data) {

    //html = "<div><h2></h2><img src=\"\" alt=\"\"/><p></p></div>
    base = data.results[0];

    titleANDyear = "<div><h2>" + base.title + " <span>" + base.release_date + "</span></h2>";
    img = "<img src=\"" + baseImageURL + configData.poster_sizes[3] + base.poster_path + "\"" + "alt=\"" + base.title + "\"/>";
    plot = "<p>" + base.overview + "</p></div>";
    filmFormatted = titleANDyear + img + plot;
    console.log(filmFormatted);

    document.getElementById('input').innerHTML += filmFormatted;
}

let filmCtr = 0;

function filmDataIntoHTMLUPDATED(data) {
    console.log(data.RGB_avg);
    releasDate = data.release_date.split("-");
    if (releasDate[0] == "") {
        releasDate[0] = "n.a.";
    }
    //console.log(releasDate[0]);

    let baseImg = "https://image.tmdb.org/t/p/";
    let imgSizes = ["w92", "w154", "w185", "w370_and_h556_bestv2", "w342", "w500", "w780", "original"];
    titleANDyear = "<div class=\"to_shadow\" id=\"film" + filmCtr + "\"><h2>" + data.original_title + " (" + releasDate[0] + ")" + "</h2><h3>" + data.title + "</h3>";
    img = "<img src=\"" + baseImg + imgSizes[3] + data.poster_path + "\"" + "alt=\"" + data.title + "\"/>";
    plot = "<p>" + data.overview + "</p></div>";
    filmFormatted = titleANDyear + img + plot;
    document.getElementById('input').innerHTML += filmFormatted;
    if (data.RGB_avg !== undefined){
        addStyling(data.RGB_avg);
        filmCtr += 1;
    }
}

function addStyling(rgbValues) {
    document.getElementById("film" + filmCtr).style.backgroundColor = "rgb(" + rgbValues[0] + "," + rgbValues[1] + "," + rgbValues[2] + ")";
    //document.getElementById("film"+filmCtr).style.boxShadow = "inset 0 0 10px 10px white";
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

