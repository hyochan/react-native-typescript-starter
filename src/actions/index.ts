const updateSearch = (input) => {
  return {
    type: 'UPDATE_SEARCH',
    value: input,
  };
};

export {
  updateSearch,
};
