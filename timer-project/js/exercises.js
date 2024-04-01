const apiKey = "n9dqk0jAPvU+Ik80MbE4vA==INSHyxcaoJOFmSzi";
const exerciseType = "stretching";
let offset = 0;
let url = `https://api.api-ninjas.com/v1/exercises?type=${exerciseType}&offset=${offset}`;

let exercisesList = [];
let currentExercise = 0;

function showExerciseName() {

	const randomIndex = Math.floor(Math.random() * exercisesList.length);
	showExerciseElement.innerText = exercisesList[randomIndex].name;

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
			console.log(data);
		})
		.catch((error) => console.error(error));
}

getExercises();
 

