import React from 'react';

const Histories = ({ datas }) => {

  // https://stackoverflow.com/questions/9518956/javascript-convert-css-style-string-into-js-object
  const cssToObj = (css) => {
    const obj = {}, s = css.toLowerCase().replace(/-(.)/g, (m, g) => {
      return g.toUpperCase();
    }).replace(/;\s?$/g,"").split(/:|;/g);
    for (let i = 0; i < s.length; i += 2)
    obj[s[i].replace(/\s/g,"")] = s[i+1].replace(/^\s+|\s+$/g,"");
    return obj;
  }

  return (
    <div className="histories">
      <h2>Contributions</h2>
      {datas && datas.map(data => (
        <div 
          key={data.id} 
          className="histories-result" 
          style={{
            background: `
              ${data.prediction.toFixed(1) > 0.5 ? 
              '#dc3545' : 
              '#28a745'}
            `
          }}
        >
          <span className="status">{data.prediction.toFixed(1) > 0.5 ? 'Rejected: ' : 'Accepted: ' }{data.prediction.toFixed(1)}</span>
          <span className="score">Score: {data.score.toFixed(1)}</span>
          <p style={data.style.length ? cssToObj(data.style) : null}>{data.paragraph}</p>
        </div>
      ))}
    </div>
  )
}

export default Histories;
