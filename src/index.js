import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

axios.defaults.headers.common['x-api-key'] = 'live_Px7dvVo2xBtlGgvAfuYlwNWpTa0l5UHIWvbfgFeFbc9DLduE10gl8sCkxxlY3C0l';

const fetchBreeds = () => {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => { throw error; });
};

const fetchCatByBreed = (breedId) => {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => { throw error; });
};


const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfoDiv = document.querySelector('.cat-info');

const showLoader = () => { loader.style.display = 'block'; };
const hideLoader = () => { loader.style.display = 'none'; };
const showError = (message) => {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
};

const populateBreedSelect = () => {
  showLoader();
  fetchBreeds()
    .then(breeds => {
      hideLoader();
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
    });
};

const displayCatInfo = (breedId) => {
  showLoader();
  fetchCatByBreed(breedId)
    .then(catData => {
      hideLoader();
      catInfoDiv.innerHTML = `
        <img src="${catData.url}" alt="${catData.breeds[0].name}">
        <div>
          <h1> <strong>${catData.breeds[0].name}</strong></h1>
          <p>${catData.breeds[0].description}</p>
          <p><strong>Temperament:
          </strong>${catData.breeds[0].temperament}</p>
        </div>
      `;
    })
    .catch(error => {
      console.error('Error fetching cat information:', error);
    });
};

breedSelect.addEventListener('change', (e) => {
  const selectedBreed = e.target.value;
  displayCatInfo(selectedBreed);
});

populateBreedSelect();
