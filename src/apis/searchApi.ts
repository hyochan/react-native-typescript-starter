const SERVER_URL = "http://";
const SEARCH_API = SERVER_URL + "api/search/";

const searchText = (searchText) => {
  console.log("uploadItem : " + SEARCH_API);
  const object = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body : searchText,
  };
  console.log(object);
  return fetch(SEARCH_API, object)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
}

export {
  searchText,
};
