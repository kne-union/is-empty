const isPlainObject = require('lodash/isPlainObject');
const getValues = require('lodash/values');
const isArray = require('lodash/isArray');

const isNotEmpty = value => {
  if (isPlainObject(value)) {
    const values = getValues(value);
    return values.length > 0 && values.some(item => isNotEmpty(item));
  } else if (isArray(value)) {
    return value.length > 0 && value.some(item => isNotEmpty(item));
  } else if (typeof value === 'number') {
    return !isNaN(value);
  } else {
    return !(value === undefined || value === null || value === '' || value.length === 0);
  }
};

const filterEmpty = (value = {}) => {
  if (isArray(value)) {
    return value.map(item => filterEmpty(item)).filter(isNotEmpty);
  }
  if (isPlainObject(value)) {
    const output = {};
    Object.keys(value).forEach(key => {
      const current = filterEmpty(value[key]);
      if (isNotEmpty(current)) {
        output[key] = current;
      }
    });
    return output;
  }
  return value;
};

const isEmpty = value => !isNotEmpty(value);

module.exports = { isEmpty, isNotEmpty, filterEmpty };
