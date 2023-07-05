export const clearObject = (data = {}) => {
  const res = {};

  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (!!element) {
        res[key] = element;
      }
    }
  }

  return res;
};
