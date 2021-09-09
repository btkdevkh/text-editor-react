import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import Histories from './Histories';
import { getFromLS, saveToLS } from '../utils/utils';

const TextEditor = () => {

  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [datas, setDatas] = useState(null);
  const txtAreaRef = useRef();

  useEffect(() => {
    setDatas(getFromLS("contributions"));
  }, [])


  const handleBtnClick = (e) => {
    const dataAttr = e.currentTarget.getAttribute('data-cmd');
    switch (dataAttr) {
      case "justify":
        txtAreaRef.current.style.textAlign = "justify";
        break;
      case "center":
        txtAreaRef.current.style.textAlign = "center";
        break;
      case "left":
        txtAreaRef.current.style.textAlign = "left";
        break;
      case "right":
        txtAreaRef.current.style.textAlign = "right";
        break;
      case "bold":
        txtAreaRef.current.style.fontWeight = "bold";
        break;
      case "italic":
        txtAreaRef.current.style.fontStyle = "italic";
        break;
      case "underline":
        txtAreaRef.current.style.textDecoration = "underline";
        break;
      case "upper":
        txtAreaRef.current.style.textTransform = "uppercase";
        break;
      case "lower":
        txtAreaRef.current.style.textTransform = "lowercase";
        break;
      case "eraser":
        txtAreaRef.current.style = "";
        break;
      default:
        setText("");
        txtAreaRef.current.style = "";
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let API_URL = "https://moderation.logora.fr";

    // Define NODE_ENV mode
    if(process.env.NODE_ENV === "development") {
      API_URL = "http://localhost:3000";
    }

    if(!text) {
      setError("* Field Required");
    } else { 
      // Get route/predict
      fetch(API_URL+"/predict?text="+text)
        .then(res => {
          if(res.status === 200) return res.json();
          else throw new Error("Server error on getting prediction");
        })
        .then(data => {
          // Get route/score
          fetch(API_URL+"/score?text="+text)
            .then(res => {
              if(res.status === 200) return res.json();
              else throw new Error("Server error on getiing score");
            })
            .then(score => {
              // Construct object contribution
              const contribution = {
                id: Math.floor(Math.random() * Date.now()),
                prediction: data.prediction[0],
                score: score.score,
                paragraph: text,
                style: txtAreaRef.current.style.cssText
              }

              // Get contribution in LS
              const contributionsLS = getFromLS("contributions");

              // Push to [] if null or not
              contributionsLS.push(contribution);

              // Store contribution in LS
              saveToLS("contributions", contributionsLS);
              window.location.reload();
            }).catch(err => setError(err.message));

        }).catch(err => setError(err.message));

        setText("");
        setError("");
    }
  }

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <div className="btn-container">
          <Button 
            cmd="justify"
            handleBtnClick={handleBtnClick} 
          >
            <i className="fas fa-align-justify"></i>
          </Button>

          <Button 
            cmd="center"
            handleBtnClick={handleBtnClick} 
          >
              <i className="fas fa-align-center"></i>
          </Button>

          <Button 
            cmd="left"
            handleBtnClick={handleBtnClick} 
          >
            <i className="fas fa-align-left"></i>
          </Button>

          <Button 
            cmd="right"
            handleBtnClick={handleBtnClick} 
          >
            <i className="fas fa-align-right"></i>
          </Button>

          <Button 
            cmd="bold"
            handleBtnClick={handleBtnClick} 
          >
            <i className="fas fa-bold"></i>
          </Button>

          <Button 
            cmd="italic"
            handleBtnClick={handleBtnClick} 
          >
              <i className="fas fa-italic"></i>
          </Button>

          <Button 
            cmd="underline"
            handleBtnClick={handleBtnClick} 
          >
            <i className="fas fa-underline"></i>
          </Button>

          <Button 
            cmd="upper"
            btnStyle="case"
            handleBtnClick={handleBtnClick} 
          >
            Aa
          </Button>

          <Button 
            cmd="lower" 
            btnStyle="case"
            handleBtnClick={handleBtnClick} 
          >
            aA
          </Button>

          <Button 
            cmd="eraser"
            handleBtnClick={handleBtnClick} 
          >
            <i className="fas fa-eraser"></i>
          </Button>

          <Button 
            handleBtnClick={handleBtnClick} 
          >
            <i className="far fa-trash-alt"></i>
          </Button>
        </div>
        
        <textarea 
          ref={txtAreaRef} 
          value={text} 
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <div className="error">{error}</div>
        
        <button className="submit" type="submit">Send</button>

        <hr />

        {datas && datas.length > 0 ? <Histories datas={datas} /> : null}
      </form>
    </div>
  )
}

export default TextEditor;
