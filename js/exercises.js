const apiKey = "EziF0vjSGSzDvyod/Wp3tw==Uq5lrqSDKB4OwCNp";
const exerciseType = "stretching";
let offset = 0;
let url = `https://api.api-ninjas.com/v1/exercises?type=${exerciseType}&offset=${offset}`;

let exercisesList = [];
let currentExercise = 0;

function showExerciseName() {
    showExerciseElement.innerText = exercisesList[currentExercise].name;

    if (currentExercise === 9) {
        offset += 10;
        currentExercise = 0;
        url = `https://api.api-ninjas.com/v1/exercises?type=${exerciseType}&offset=${offset}`;
        getExercises();
    } 
}

function getExercises() {
    fetch(url, {
        headers: {
            "X-Api-Key": apiKey,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch exercises');
            }
            return response.json();
        })
        .then((data) => {
            exercisesList = data;
            localStorage.setItem('exercisesList', JSON.stringify(exercisesList));
            localStorage.setItem('offset', offset.toString());
            console.log(data);
        })
        .catch((error) => console.error(error));
}

const savedExercises = localStorage.getItem('exercisesList');
const savedOffset = localStorage.getItem('offset');
const savedCurrentExercise = localStorage.getItem('currentExercise');
if (savedExercises && savedOffset) {
    exercisesList = JSON.parse(savedExercises);
    offset = parseInt(savedOffset);
    currentExercise = parseInt(savedCurrentExercise);
    console.log('Exercícios carregados do localStorage');
} else {
    getExercises();
}
