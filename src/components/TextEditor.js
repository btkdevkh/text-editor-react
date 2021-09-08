import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import Histories from './Histories';

const TextEditor = () => {

  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [datas, setDatas] = useState(null);
  const txtAreaRef = useRef();

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

    if(!text) {
      setError("* Field Required");
    } else {      
      fetch("/predict?text="+text)
      .then(res => {
        console.log("PREDICTION", res);
        if(res.status === 200) return res.json();
        else throw new Error("Server error");
      })
      .then(data => {
        console.log("DATA PREDICTION", data);

        // Call another api
        fetch("/score?text="+text)
        .then(res => {
          console.log("SCORE", res);
          if(res.status === 200) return res.json();
          else throw new Error("Server error");
        })
        .then(score => {
          console.log("DATA SCORE", score);

          // Store all datas API calls in LS
          const contribution = {
            id: Math.floor(Math.random() * Date.now()),
            prediction: data.prediction[0],
            score: score.score,
            paragraph: text,
            style: txtAreaRef.current.style.cssText
          }

          // .replace(/;/g,',').split(", ")

          let contributionsLS = JSON.parse(localStorage.getItem("contributions"));
          if(contributionsLS === null) {
            contributionsLS = [];
          }
          contributionsLS.push(contribution);
          localStorage.setItem("contributions", JSON.stringify(contributionsLS));
          window.location.reload();
        })
      })
      .catch(err => setError(err.message));

      setText("");
      setError("");
    }
  }

  useEffect(() => {
    console.log(txtAreaRef.current.style.cssText);
    let contributionsLS = JSON.parse(localStorage.getItem("contributions"));
    if(contributionsLS !== null) setDatas(contributionsLS);
  }, [])

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

        {datas && <Histories datas={datas} />}
      </form>
    </div>
  )
}

export default TextEditor;
