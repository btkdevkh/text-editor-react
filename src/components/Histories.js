import React from 'react';
import { cssToObj } from '../utils/utils';

const Histories = ({ datas }) => {
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
          <span className="score">Score: {data.score.toFixed(2)}</span>
          <p style={data.style.length ? cssToObj(data.style) : null}>{data.paragraph}</p>
        </div>
      ))}
    </div>
  )
}

export default Histories;
