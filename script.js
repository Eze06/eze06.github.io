
var planetImg = document.querySelector(".planet-img");
var planetInformation = document.querySelector("#planet-information");

var planetName = document.querySelector(".planet-name");
var distanceFromSun = document.querySelector(".distance-from-sun");
var sizeOfPlanet = document.querySelector(".size-of-planet");

var planetIndex = 0;
const numPlanets = 8;

const planetNames = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

const planetImages = ["image/mercury-planet.png", "image/venus-planet.png", "image/earth-planet.png", "image/mars-planet.png"
                    , "image/jupiter-planet.png", "image/saturn-planet.png", "image/uranus-planet.png", "image/neptune-planet.png"
                    ]

const planetDistance = ["52.702 Million Kilometers (Closest) ", "107.53 Million Kilometers", "149 Million Kilometers","228 Million kilometers",
                    "778 Million Kilometers","1.43 Billion Kilometers ","2.9 Billion Kilometers ","4.5 Billion Kilometers (Farthest) "]

const planetSizes = ["74.8 million km²", "460.2 million km²", "510.1 million km²", "144.4 million km²", 
                "61.42 billion km²", "42.7 billion km²", "8.083 billion km²", "7.618 billion km²"
]

//Sections of different pages
const planetPage = document.querySelector("#planets");
const aboutPage = document.querySelector("#about");

var planetBriefSelector = document.querySelectorAll(".planet-selector h3");

var planetBriefSelectorBool = [true, false, false, false, false, false, false, false] //Used to check which planet selector is selected (default is mercury selected)

var planetsButton = document.querySelector(".planets-button");
var aboutButton = document.querySelector(".about-button");
var moonsButton = document.querySelector(".moons-button");

var prevButton = document.querySelector(".previous");
var nextButton = document.querySelector(".next");

function AddSlideNextAnim()
{    
    //reset elements
    planetImg.classList.remove("slidenxt-anim");
    planetImg.classList.remove("slideprev-anim");
    planetInformation.classList.remove("slidenxt-anim");
    planetInformation.classList.remove("slideprev-anim");

    planetPage.offsetHeight;

    planetImg.classList.add("slidenxt-anim");
    planetInformation.classList.add("slidenxt-anim");

}

function AddSlidePrevAnim()
{
    planetImg.classList.remove("slideprev-anim");
    planetImg.classList.remove("slidenxt-anim");
    planetInformation.classList.remove("slideprev-anim");
    planetInformation.classList.remove("slidenxt-anim");

    planetPage.offsetHeight;

    planetImg.classList.add("slideprev-anim");
    planetInformation.classList.add("slideprev-anim");
}

function ShowPlanet(index)
{    
    //Clear planet brief selection
    for(let i = 0 ; i < planetBriefSelector.length; i++)
    {
        if(planetBriefSelectorBool[i] == true)
        {
            planetBriefSelector[i].style.color = "#333333";
            planetBriefSelector[i].style.borderColor = "#333333";
            planetBriefSelectorBool[i] = false;
        }
    }

    //Set information of planet
    planetName.innerHTML = planetNames[index];
    planetImg.src = planetImages[index];
    distanceFromSun.innerHTML = "<strong>Distance From Sun: </strong>" + planetDistance[index];
    sizeOfPlanet.innerHTML = "<strong>Size Of Planet: </strong>" + planetSizes[index];

    //Select correct planet brief
    planetBriefSelectorBool[index] = true;
    planetBriefSelector[index].style.color = "White";
    planetBriefSelector[index].style.borderColor = "White";
    
}

function ChangePlanetBrief(index)
{
    
    planetIndex = index;
    //Show planet
    ShowPlanet(index);
    //Reset animation
    AddSlideNextAnim();


}

function OpenPlanetPage()
{
    //Close About and Moons page
    aboutPage.style.display = "none";

    //Display planet page
    planetPage.style.display = "flex";

    aboutButton.style.textDecoration = "none";
    planetsButton.style.textDecoration = "underline";

    AddSlideNextAnim();
}

function OpenAboutPage()
{
    //Close moons and planets page
    planetPage.style.display = "none";

    //Display about page
    aboutPage.style.display = "grid";

    aboutButton.style.textDecoration = "underline";
    planetsButton.style.textDecoration = "none";
}

function NextPlanet()
{
    //Check if index >= total number of planets
    if(planetIndex >= numPlanets - 1)
    {
        //Reset index
        planetIndex = 0;
    }
    else
    {
        planetIndex++;
    }
    //set planet information
    ShowPlanet(planetIndex);

    AddSlideNextAnim();
}

function PrevPlanet()
{
    //Check if index <= 0
    if(planetIndex <= 0)
    {
        //Set the index to the max number of planets
        planetIndex = numPlanets - 1;
    }
    else
    {
        planetIndex--;
    }
    //set planet information
    ShowPlanet(planetIndex);
    AddSlidePrevAnim();
}

//Add onclick buttons to About Moon and Planets page



planetsButton.addEventListener("click", OpenPlanetPage);
aboutButton.addEventListener("click", OpenAboutPage);

prevButton.addEventListener("click", PrevPlanet);
nextButton.addEventListener("click", NextPlanet);

// Handle Planet Brief Selectors (Add color and change on click)
planetBriefSelector[planetIndex].style.color = "White";
planetBriefSelector[planetIndex].style.borderColor = "White";

for(let i = 0; i < planetBriefSelector.length; i++)
{
    planetBriefSelector[i].addEventListener("click", function(){ChangePlanetBrief(i)});
}
