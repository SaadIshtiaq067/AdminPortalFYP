import React, { useState } from "react";
import { Layout, Header, Navigation, Drawer, Content, Footer, } from "react-mdl";
import "./App.css";
import Main from "./components/main";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Auth from "./components/auth";
import Dashboard from "./components/dashboard"
import Contactus from "./components/contactus"
import ViewUsers from "./components/viewUsers"
import viewexercise from "./components/viewExercise"
import DA from "./assets/DA.png"

import {
  faDatabase,
  faPlusCircle,
  faHome,
  faQuestion,
  faMailBulk,
  faPhone,
  faSignInAlt,
  faComment,
  faPaperPlane,
  faLeaf,
  faChartPie,
  faSignOutAlt,
  faTree,
  faBug,
  faUser,
  faUserGraduate,
  faAddressCard,
  faFileSignature,
  faPersonBooth,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "react-alert";


function App(props) {
  // return(
  //   <div>
  //     < />
  //   </div>
  // )
  const alert = useAlert();
  const history = useHistory()

  const showNavigation = () => {
    if (!Auth.isAuthenticated()) {
      return (
        <Navigation>

            <Link to="/contactus"
            style={{ backgroundColor: "Red", color: "White" }}>
            <FontAwesomeIcon icon={faFileSignature} style={{ marginRight: "10px" }} />
            Contact Us
          </Link>
    
          <Link
            to={Auth.isAuthenticated() ? "/logout" : "/alogin"}
  
            
            style={{ backgroundColor: "Green", color: "White" }}
          >
            <FontAwesomeIcon
              icon={Auth.isAuthenticated() ? faSignOutAlt : faSignInAlt}
              style={{ marginRight: "10px" }}
            />
            {Auth.isAuthenticated() ? "Logout" : "Login"}
          </Link>
        </Navigation>
      );
    } 
    else if (Auth.isAuthenticated(true)) {
      return (
        <Navigation>
          <Link to="/dashboard">
            <FontAwesomeIcon
              icon={faChartPie}
              style={{ marginRight: "10px" }}
            />
            Dashboard
          </Link>
          <Link to="/viewExercise">
            <FontAwesomeIcon icon={faTree} style={{ marginRight: "10px" }} />
            Wxercises
          </Link>
  
          <Link to="/viewUsers">
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
            View Patients
          </Link>      
          <Link
            to={Auth.isAuthenticated() ? "" : "/alogin"}
            style={{ backgroundColor: "white", color: "green" }}
            onClick={() => {
              if (Auth.isAuthenticated()) {
                alert.show("Are You Sure to Logout? ", {
                  title: "Logout",
                  closeCopy: "No. Dont",
                  actions: [
                    {
                      copy: "Yes. Logout",
                      onClick: () => {
                        Auth.logout();
                        history.push("/");
                      },
                    },
                  ],
                });
              }
            }}
          >
            <FontAwesomeIcon
              icon={Auth.isAuthenticated() ? faSignOutAlt : faSignInAlt}
              style={{ marginRight: "10px" }}
            />
            {Auth.isAuthenticated() ? "Logout" : "Login"}
          </Link>
        </Navigation>
      );
    } else if (Auth.isAuthenticated()) {
      return (
        <Navigation>
          <Link to="/dashboard">
            <FontAwesomeIcon
              icon={faChartPie}
              style={{ marginRight: "10px" }}
            />
            Dashboard
          </Link>
          <Link to="/viewexercise">
            <FontAwesomeIcon icon={faTasks} style={{ marginRight: "10px" }} />
            Exercises
          </Link>
          <Link to="/Complaints">
            <FontAwesomeIcon icon={faBug} style={{ marginRight: "10px" }} />
            Complaints
          </Link>
          {/* <Link to="/forum">
            <FontAwesomeIcon icon={faComment} style={{ marginRight: "10px" }} />
            Community
          </Link> */}
          <Link to="/viewUsers">
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
            Patients
          </Link>
          <Link
            to={Auth.isAuthenticated() ? "/" : "/alogin"}
            style={{ backgroundColor: "white", color: "green" }}
            onClick={() => {
              if (Auth.isAuthenticated()) {
                alert.show("Are You Sure to Logout? ", {
                  title: "Logout",
                  closeCopy: "No. Cancel",
                  actions: [
                    {
                      copy: "Yes. Logout",
                      onClick: () => {
                        Auth.logout();
                        history.push("/");
                      },
                    },
                  ],
                });
              }
            }}
          >
            <FontAwesomeIcon
              icon={Auth.isAuthenticated() ? faSignOutAlt : faSignInAlt}
              style={{ marginRight: "10px" }}
            />
            {Auth.isAuthenticated() ? "Logout" : "Login"}
          </Link>
        </Navigation>
      );
    }
  };

  const showDrawer = () => {
    return (
      <Drawer
        title={
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            Welcome
          </Link>
        }
      >
        <Navigation>
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faChartPie} /> Dashboard{" "}
          </Link>

          <Link to="/viewUsers">
            <FontAwesomeIcon icon={faDatabase} /> View Plant Details{" "}
          </Link>
      
          <Link to="/Complaints">
            <FontAwesomeIcon icon={faDatabase} /> View Pest Details
          </Link>

  
          <Link to="/viewUsers">
            <FontAwesomeIcon icon={faDatabase} /> View Users
          </Link>
        </Navigation>
      </Drawer>
    );
  };
  return (
    <div className="demo-big-content">
      <Layout>
      
        <Header
          
          title={
            
            <Link to="/landing" style={{ textDecoration: "none", color: "White", fontWeight: 'bold', justifyContent: 'center', alignItems: 'center',}}>
              
              {<img src={DA} alt="logo" style={{width:'50px',height:'50px'}} /> }   Dyslexia Aid Admin Panel
            </Link>
            
          }
          scroll
        >
          {showNavigation()}
        </Header>
        {/* {showDrawer()} */}
        <Content>
          <div className="page-content" />
          <Main />
        </Content>
      
      </Layout>
    </div>
  );
}

export default App;
