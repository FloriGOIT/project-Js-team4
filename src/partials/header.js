import { remove } from 'lodash';
import Notiflix from 'notiflix'; 
import {destroyChart} from './page2-container4';

let currentDate = new Date();
let currentDateInMillis = new Date().getTime();
let currentDateInSeconds = Math.floor(currentDateInMillis / 1000);
let myTimeSeconds = currentDate.getTimezoneOffset() * 60;
let timezoneOffsetSeconds = -18000;
let dateeeeUnix = currentDateInSeconds + timezoneOffsetSeconds + myTimeSeconds;
let dateeee = new Date(dateeeeUnix * 1000)

//declaration
let body = document.querySelector("body");
let searchSection = document.querySelector(".search-section");
let form = document.querySelector(".searchbar");
let inputText = ``;
let retrievedArray = [];
let citiesArr = [];
let cityInput = document.querySelector("#city-input");
let saveCitySVG = document.querySelector("#star");
let searchCitySVG = document.querySelector("#gps");
let savedCities = document.querySelector(".saved-cities");
let savedCitiesWidth = savedCities.parentNode.offsetWidth; 
export let localStoreTemporary = "temporary";
localStorage.setItem("localCities",[])
let prevButton = document.querySelector(".prevButton");
let nextButton = document.querySelector(".nextButton");
let itemsPerPage;
if (savedCitiesWidth < 220){itemsPerPage = 2;}
else{itemsPerPage = 4;}
let initial = 0;
let closeBtn23 = document.querySelector('.close__more-info');
let hideCart24 = document.querySelector('.hide-chart-div');
let largeImageARR = [];
//functions

//scroll saved city


function btnShow(){if(citiesArr.length > itemsPerPage){nextButton.style.visibility = "visible";}
                      else{nextButton.style.visibility = "hidden";
                          prevButton.style.visibility = "hidden";
                           savedCities.style.transform = `translatex(0px)`;}}
                         

function getInput(){inputText = form.elements.userinput.value.toLowerCase();
                     return inputText;}



function savedCityMarkup()
{/*let retrievedArrayAsString = localStorage.getItem("localCities");

let xx;
if (retrievedArrayAsString !== null) {
  xx = JSON.parse(retrievedArrayAsString);
} else {
  console.log("No data found in localStorage for key 'localCities'");
}

  retrievedArray.push(xx);


  console.log(retrievedArray);
  citiesArr = [`${retrievedArray}`];
  console.log(citiesArr)*/
  if(inputText == undefined){Notiflix.Notify.warning('Enter a valid city name.')}
  else if(inputText.length !== 0)
      {if(!citiesArr.includes(inputText)){ citiesArr.push(inputText.toLowerCase());
                                          let item = document.createElement("li");
                                          item.classList.add("saved-city");
                                          item.setAttribute("id", `${inputText}`);
                                          item.setAttribute("title", `${inputText}`);
                                          let markup = `<span class="city">${inputText}</span>
                                                        <button type="button" class="close-city" title = ${inputText}>❌</button>`;
                                      savedCities.append(item);
                                      item.insertAdjacentHTML("beforeend", markup);
                                      localStorage.setItem("localCities", JSON.stringify(citiesArr));
                                      btnShow();
                                      form.reset();
                                      return citiesArr;}
       else{Notiflix.Notify.warning('City already as favorite.')}}
  else(Notiflix.Notify.warning('Enter a valid city name.'));

};

function emptyMarkup(event){event.preventDefault();
                          let g = event.target;
                          console.log("g.nodeName",g.nodeName)
                          let attribute = g.getAttribute("title");
                          console.log("attribute",attribute)
                          let gg = g.parentNode;
                          console.log("gg",gg)
                          if(g.nodeName == "BUTTON"){gg.remove();
                                                     citiesArr.splice(citiesArr.indexOf(attribute),1)
                                                     localStorage.setItem("localCities", JSON.stringify(citiesArr));
                                                     initial = 0;
                                                     savedCities.style.transform = `translatex(0px)`;
                                                     prevButton.style.visibility = "hidden";}
                          btnShow()
                             }

function storedCities()
{
console.log("storedCities:")
  localStorage.setItem('temporary', '');
try {
  retrievedArray = JSON.parse(localStorage.getItem("localCities"));
  citiesArr = [...retrievedArray];
} catch (error) {
  citiesArr = [];
}
if(citiesArr.length !== 0){citiesArr.forEach(city => {let item = document.createElement("li");
                                                      item.classList.add("saved-city");
                                                      item.setAttribute("id", `${city}`);
                                                      item.setAttribute("title", `${city}`);
                                                      let markupSaved = `<span class="city">${city}</span>
                                                                         <button type="button" class="close-city" title = ${city}>❌</button>`;
                                                      savedCities.append(item);
                                                      item.insertAdjacentHTML("beforeend", markupSaved)});
                                                      btnShow();                                       
                                                      return retrievedArray;}                                              
};

storedCities()

function showNextItems(){let maxTrans = (citiesArr.length - itemsPerPage) * 113;                   
                         if(initial < maxTrans){initial += 113;
                                                 savedCities.style.transform = `translatex(-${initial}px)`};
                         if(initial == maxTrans){nextButton.style.visibility = "hidden"};
                                                 prevButton.style.visibility = "visible";
                                                  return initial;}
function showPreviousItems(){if(initial > 0){initial -= 113;
                                                savedCities.style.transform = `translatex(-${initial}px)`;
                                                if (initial == 0){nextButton.style.visibility = "visible";
                                                                  prevButton.style.visibility = "hidden";}}
                                                return initial;}                                       

function inputSearch(event){console.log(inputText);
                       let apiUrl = `https://pixabay.com/api/?key=42799638-b50871d8c9a958480a9d6ba7c&&safesearch=true&image_type=photo&pretty=true&q=${inputText}`;
                       fetch(apiUrl).then(response => {if (!response.ok) {console.log("response No:", body);}
                                                        else{return response.json()};})
                                    .then(data => {for(let hit of data.hits){if (hit.tags.includes("landscape") || hit.tags.includes("city") || hit.tags.includes("architecture") || hit.tags.includes("building") || hit.tags.includes("landmark"))
                                                                               {largeImageARR.push(hit.largeImageURL);};};
                                                                             if(largeImageARR.length > 1){body.style.backgroundImage = `url('${largeImageARR[1]}')`;}
                                                                             else{body.style.backgroundImage = `url('${largeImageARR[0]}')`}});
                       largeImageARR=["https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/wheat-field-with-cypresses-digital-remastered-edition-vincent-van-gogh.jpg"];
                       localStorage.setItem('temporary', `${inputText}`);
                       closeBtn23.click();
                       hideCart24.click();
                       form.reset();}

function addInputText(event){
                            let www = event.target;
                            console.log("www", www)
                             if(event.target.nodeName == "SPAN"){inputText = www.textContent;
                                                                  inputSearch();
                                                                  largeImageARR=["https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/wheat-field-with-cypresses-digital-remastered-edition-vincent-van-gogh.jpg"];
                                                                inputText = ``; return;};
                             localStorage.setItem('temporary', `${inputText}`);
                             }                                   

function inputSearchDefault(event){event.preventDefault();
                                   inputSearch(); }         


//eventlistener
cityInput.addEventListener("input", getInput);
saveCitySVG.addEventListener("click", savedCityMarkup);
savedCities.addEventListener("click", emptyMarkup);
nextButton.addEventListener("click", showNextItems);
prevButton.addEventListener("click", showPreviousItems);
form.addEventListener("submit", inputSearchDefault);
searchCitySVG.addEventListener("click", inputSearchDefault);
savedCities.addEventListener("click", addInputText);

export {addInputText}



