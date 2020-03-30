var apiURL = "https://games-world.herokuapp.com";

fetch(apiURL + "/games", {
    method: "GET",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded"
    }
}).then(function(response){
return response.json();
}).then(function(arrayOfGames){
//console.log("the response  ", arrayOfGames);

var container1 = document.querySelector('.container');

//console.log(container1);

// for (var i=0; i < arrayOfGames.length; i++){
//     //console.log(arrayOfGames[i]);
//     const h1 = document.createElement("h1");
//     const p = document.createElement("p");
//     const img = document.createElement("img");

//     h1.innerHTML = arrayOfGames[i].title;
//     p.innerHTML = arrayOfGames[i].description;

//     img.setAttribute("src", arrayOfGames[i].imageUrl);

//     container.appendChild(h1);
//     container.appendChild(img);
//     container.appendChild(p); 
// }

let gameElements = "";

for (var i = 0; i < arrayOfGames.length; i++){

    //  gameElements += "<h1>"+ arrayOfGames[i].title + "</h1>" +
    //                      "<img src='" + arrayOfGames[i].imageUrl + "' />" +
    //                       "<p>" + arrayOfGames[i].description + "</p>" +
    //                        "<button class = 'delete-btn' " + 
    //                             " onclick=\"deleteGame('" + arrayOfGames[i]._id + "') \">Delete</button>" ;

    gameElements +=`<h1>${arrayOfGames[i].title}</h1>
                    <img src="${arrayOfGames[i].imageUrl}"/> 
                    <p>${arrayOfGames[i].description}</p> 
                    <button class = "delete-btn" onclick = "deleteGame('${arrayOfGames[i]._id}')" >Delete</button> `;
}

container1.innerHTML = gameElements;
});


function deleteGame(gameID){
    //console.log("delete the game ", gameID);


fetch(apiURL + "/games/" + gameID,{
    method: "DELETE"
}).then(function(r){
    return r.text();
}).then(function(apiresponse){
    console.log(apiresponse);
    location.reload(true);
});

}

document.querySelector(".submitBtn").addEventListener("click",function(event){
        event.preventDefault();

        const gameTitle= document.getElementById("gameTitle");
        const gameDescription= document.getElementById("gameDescription");
        const gameGenre= document.getElementById("gameGenre");
        const gamePublisher= document.getElementById("gamePublisher");
        const gameImageUrl= document.getElementById("gameImageUrl");
        const gameRelease= document.getElementById("gameRelease");


    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The Genre is required!");
    validateFormElement(gameImageUrl, "The image URL is required!");
    validateFormElement(gameRelease, "The release date is required!");

validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");


if(gameTitle.value !=="" && gameGenre.value !=="" && gameImageUrl.value !=="" && gameRelease.value !==""){
    
    var urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitle.value);
        urlencoded.append("releaseDate", gameRelease.value);
        urlencoded.append("genre", gameGenre.value);
        urlencoded.append("publisher", gamePublisher.value);
        urlencoded.append("imageUrl", gameImageUrl.value);
        urlencoded.append("description", gameDescription.value);


        createGameRequest(urlencoded);
}

})



function validateFormElement(inputElement, errorMessage){
    if(inputElement.value === "") {
    if(!document.querySelector('[rel="' + inputElement.id + '"]')){
        buildErrorMessage(imputElement, errorMessage);
    }
}else{
    if(document.querySelector('[rel="' + inputElement.id + '"]')){
        console.log("the eror is erased!");
        document.querySelector('[rel="' + inputElement.id + '"]').remove();
        inputElement.classList.remove("inputError");
    }

}

}
function validateReleaseTimestampElement(inputElement, errorMessage){
    if(isNaN(inputElement.value) && inputElement.value !==""){
        buildErrorMessage(inputElement, errorMessage);
    }
}

function buildErrorMessage(inputEL, errosMsg){
    inputEL.classList.add('inputError');
    const errorMsgElement = document.createElement('span');
    errorMsgElement.setAttribute("rel", inputEL.id);
    errorMsgElement.classList.add('errosMsg');
    errorMsgElement.innerHTML = errosMsg ;
    inputEL.after(errorMsgElement);
}


function createGameRequest(gameObject){

    fetch(apiURL + "/games",{
        method: "POST",
        headers: {
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body :gameObject
    }).then(function(response){
        return response.text();
    }).then(function(createdGame){
        console.log(createdGame);
    });

}