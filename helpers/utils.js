import lodash from "lodash";

const { isUndefined, isEmpty, isNull } = lodash;

export const clearObject = (data = {}) => {
  const res = {};

  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];

      if (
        (!isUndefined(element) && !isEmpty(element)) ||
        isNull(element) ||
        isID(element)
      ) {
        res[key] = element;
      }
    }
  }

  return res;
};

export const isID = (value) => {
  return Boolean(Number(value)) && Number(value) > 0;
};
