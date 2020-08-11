import PubSub from 'pubsub-js';
import * as API from './api.js';
import fetchURL from './modules/fetcher.js';
import timeoutPromise from './modules/promeses.js';
import setImgSrc from './modules/doman.js';
import './assets/styles/styles.css';

const getGIF = async (word) => {
  const api = API.getAPIKey();
  const url = `https://api.giphy.com/v1/gifs/translate?api_key=${api}&s=${word}`;
  let result;

  try {
    result = await Promise.race([
      fetchURL(url),
      timeoutPromise(3000)
    ]);
  } catch(error) {
    result = await error;
  }

  return result.json();
};

getGIF('cat')
.then(result => {
  const gifURL = result.data.images.original.url;
  PubSub.publish('GIF downloaded', gifURL);
})
.catch(error => console.error(error));

const showImg = (notice, url) => {
  setImgSrc('gif-img', url);
};

PubSub.subscribe('GIF downloaded', showImg);