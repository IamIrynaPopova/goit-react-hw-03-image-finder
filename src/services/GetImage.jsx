const API_KEY = '33396133-a1b2adde6227e288651288158';
const BASE_URL = 'https://pixabay.com/api/';

export const GetImage = (value, page) => {
  return  fetch(
    `${BASE_URL}?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  )
};

