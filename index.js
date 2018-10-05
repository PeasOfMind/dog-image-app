'use strict'

function getEndpoint(num, breed){
    if (breed) return `https://dog.ceo/api/breed/${breed}/images/random/${num}`
    else return `https://dog.ceo/api/breeds/image/random/${num}`
}

function getDogImages(num, breed){
    fetch(getEndpoint(num, breed))
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Please pick a number between 1 and 50 or try again later.'))
}

function displayResults(responseJson){
    //unhappy case
    if (responseJson.status === 'error') {
        const imgString = `<h2>Sorry. ${responseJson.message}.
        <img class="result-img not-found" src="https://i.imgur.com/UaEscmK.jpg" alt="sad fat cat"></h2>`
        $('.js-result').removeClass('hidden').html(imgString);        
    } else {
        //happy case
        const imgArray = responseJson.message.map((imgLink, idx) => {
            return `<img class="result-img" src="${imgLink}" alt="random dog image number ${idx+1}">`
        });
        $('.js-result').removeClass('hidden').html(imgArray.join("\n"));
    }
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const imageNum = $(event.currentTarget).find('#image-num').val();
        const breedName = $(event.currentTarget).find('#dog-breed').val();
        getDogImages(imageNum, breedName);
    });
}

$(watchForm);