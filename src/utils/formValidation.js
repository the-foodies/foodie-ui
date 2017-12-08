
export const validChars = (str) => {
  if (/[^ \""\''\-\&\.\,\:\;\?\!\%\#\$\@\+a-zA-z0-9]/g.test(str)) {
    return true;
  }
  return false;
};

export const numsOnly = (str) => {
  if (/[^0-9]/g.test(str)) {
    return true;
  }
  return false;
};

export const trimFirstSpace = (arr) => {
  let temp = arr.map((item) => {
    let result = item;
    while (result.length !== 0 && result.charAt(0) === ' ') {
      result = result.substring(1);
    }
    return result;
  });
  temp = temp.filter((item) => { return item !== ''; });
  return temp;
};

export const validateChars = (name, context) => {
  if (name === 'imageURL') {
    if (context.state[name] === 'https://dtfkajhqu1nl.cloudfront.net/edb/img/placeholders/placeholder-default.jpg') {
      return 'error';
    }
    return 'success';
  } else if (context.state[name] !== '') {
    if (validChars(context.state[name])) {
      return 'error';
    }
    return 'success';
  }
  return null;
};

export const validateNums = (value, context) => {
  if (context.state[value] !== '') {
    if (numsOnly(context.state[value])) {
      return 'error';
    }
    return 'success';
  }
  return null;
};
