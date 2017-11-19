const initialState = {
  search: {
    area: '',
    people: 1,
    startDate: null,
    endDate: null,
    results: [],
  },
};

function search(state = initialState.search, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH':
      console.log('action search : ' + JSON.stringify(action));
      return action.value;
    default:
      return state;
  }
}

const myReducers = {
  search,
};

export default myReducers;
