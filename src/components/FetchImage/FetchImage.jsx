import axios from 'axios';

// Функция запроса на back-end
const fetchImage = async (searchWord, page) => {
 const API_KEY = '39523931-0ebb3b1d8d203aea00476c616';
 const BASE_URL = 'https://pixabay.com/api/';

const options = {
  params: {
    key: API_KEY,
    q: searchWord,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 12,
  },
}
 return await axios.get(BASE_URL, options);
}

export default fetchImage;