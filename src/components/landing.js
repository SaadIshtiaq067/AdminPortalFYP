import React, { Component } from "react";
import { Layout, Header, Navigation, Drawer, Content, Footer } from "react-mdl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPlayCircle,
  faAppleAlt,
  faSignInAlt
} from "@fortawesome/free-solid-svg-icons";
import "./landing.css";

class landing extends Component {
  render() {
    return (
      <div className="mainBody">
        <div className="headerSection">
          <div className="overlayHeader">
            <div className="headerMainDiv">
              <h1>
                Welcome to
                <span className="titleText">Dsylexia Aid</span>
              </h1>
              <hr />
              <p>
                Dyslexia Aid is an app developed to help the dyslexic patients, this portal is only 
                for admins use.  
              </p>
              <p> Click below to download our app on your smartphone</p>
              <p> </p>

              <button className="headerBtn">
                <FontAwesomeIcon
                  icon={faDownload}
                  style={{ marginRight: "10px" }}
                />
                Download Dyslexia Aid
              </button>
            </div>
            <Footer className="footer">
          <div className="footer-div">
            <p>© 2021- Dyslexia Aid - All Rights Reserved - COMSATS University Islamabad</p>
          </div>
        </Footer>
          </div>
        </div>
      </div>
    
      
    );
  }
}

export default landing;
