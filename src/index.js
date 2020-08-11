import PubSub from 'pubsub-js';
import * as API from './api.js';

const img = document.querySelector('img');

const timeoutPromise = (delay) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject("Timeout!");
		}, delay);
	});
};

const fetchURL = async (url) => {
  let response;

  try {
    response = await fetch(url, {mode: 'cors'});
  } catch(error) {
    response = await error;
  }

  return response;
};

const getGIF = async (word) => {
  const api = API.getAPIKey();
  const url = `https://api.giphy.com/v1/gifs/translate?api_key=${api}&s=${word}`;
  let result;

  try {
    result = await Promise.race([
      fetchURL(url),
      timeoutPromise(3000)
    ]);

    result = await result.json();
  } catch(error) {
    result = await error;
  }

  return result;
};

const showImg = (notice, url) => {
  img.src = url;
};

getGIF('cat')
.then(result => {
  const gifURL = result.data.images.original.url;
  PubSub.publish('GIF downloaded', gifURL);
})
.catch(error => console.error(error));

PubSub.subscribe('GIF downloaded', showImg);