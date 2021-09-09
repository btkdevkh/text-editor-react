export const getFromLS = (name) => {
  if(localStorage.getItem(name) === null) return [];
  return JSON.parse(localStorage.getItem(name));
}

export const saveToLS = (name, datas) => {
  return localStorage.setItem(name, JSON.stringify(datas));
}

// https://stackoverflow.com/questions/9518956/javascript-convert-css-style-string-into-js-object
export const cssToObj = (css) => {
  const obj = {}, s = css.toLowerCase().replace(/-(.)/g, (m, g) => {
    return g.toUpperCase();
  }).replace(/;\s?$/g,"").split(/:|;/g);
  for (let i = 0; i < s.length; i += 2)
  obj[s[i].replace(/\s/g,"")] = s[i+1].replace(/^\s+|\s+$/g,"");
  return obj;
}
