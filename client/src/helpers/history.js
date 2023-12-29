const history = {
  navigate: null,
  push: (page, ...rest) => History.navigate(page, ...rest),
};

export default history;
