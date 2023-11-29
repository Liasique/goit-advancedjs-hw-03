import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

axios.defaults.headers.common['x-api-key'] = 'live_Px7dvVo2xBtlGgvAfuYlwNWpTa0l5UHIWvbfgFeFbc9DLduE10gl8sCkxxlY3C0l';

const fetchBreeds = () => axios.get('https://api.thecatapi.com/v1/breeds').then(response => response.data);
const fetchCatByBreed = (breedId) => axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`).then(response => response.data[0]);

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfoDiv = document.querySelector('.cat-info');

const showLoader = () => {
    loader.style.display = 'block';
    breedSelect.style.display = 'none';
    catInfoDiv.style.display = 'none';
};

let hasCatData = false;

const hideLoader = () => {
    loader.style.display = 'none';
    breedSelect.style.display = 'block';
    catInfoDiv.style.display = hasCatData ? 'block' : 'none';
};

const showError = (message) => {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight',
    });
};

const createOptionElement = (breed) => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    return option;
};

const addBreedsToSelect = (breeds) => {
    breeds.forEach(breed => breedSelect.appendChild(createOptionElement(breed)));
};

const handleFetchError = (error) => {
    console.error('Error fetching data:', error);
    showError('Unable to fetch data. Please try again later.');
    loader.style.display = 'none';
    catInfoDiv.style.display = 'none';
    breedSelect.style.display = 'block';
    hasCatData = false;
};

const populateBreedSelect = () => {
    showLoader();
    fetchBreeds()
        .then(addBreedsToSelect)
        .catch(handleFetchError)
        .finally(hideLoader);
};

const displayCatInfo = (breedId) => {
    showLoader();
    fetchCatByBreed(breedId)
        .then(catData => {
            if (catData && catData.breeds && catData.breeds.length > 0) {
                catInfoDiv.innerHTML = `
                <div>
                    <img src="${catData.url}" alt="${catData.breeds[0].name}">
                    <h1><strong>${catData.breeds[0].name}</strong></h1>
                    <p>${catData.breeds[0].description}</p>
                    <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
                </div>
                `;
                hasCatData = true;
            } else {
                throw new Error('No breed data available');
            }
        })
        .catch(handleFetchError)
        .finally(hideLoader);
};

breedSelect.addEventListener('change', (e) => displayCatInfo(e.target.value));

populateBreedSelect();
