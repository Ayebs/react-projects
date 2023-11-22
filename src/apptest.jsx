import React from "react";
import ReactDOM from "react-dom";

const date = new Date();
const currenTime = date.getHours();

let greeting;

const customStyle = {
  color: ""
};

if (currenTime < 12) {
  greeting = "bonjour";
  costumStyle.color = "red";
} else if (currenTime < 18 && currenTime >= 12) {
  greeting = "bon apres-midi";
  customStyle.color = "green";
} else {
  greeting = "bonsoir";
  customStyle.color = "blue";
}

ReactDOM.render(
  <h1 className="heading" style={customStyle}>{greeting}</h1>,
  document.getElementById("root")
);
