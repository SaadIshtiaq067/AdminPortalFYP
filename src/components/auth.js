import Axios from "axios";
import Cookies from "universal-cookie";
import { ResponsiveEmbed } from "react-bootstrap";

class Auth {
  constructor() {
    this.authenticated = false;
    this.cookies = new Cookies();
  }

  async checkAdminCreds(email, password) {
    var data = {
      email:email,
      password:password,
    };

    var toReturn = false;

    await Axios.post("http://localhost:4000/v1/api/users/login", data)
      .then((response) => {
        if (response.status === 400) {
          this.authenticated = false;
        }
        if (response.status === 200) {
          this.authenticated = true;
        }
      })
      .catch((error) => {
        console.log(error);
        this.authenticated = false;
      });

    if (this.dataFetched === true) {
      return toReturn;
    }
  }

  // async checkExpertCreds(username, password) {
  //   var data = {
  //     username: username,
  //     password: md5(password),
  //   };

  //   await Axios.post("https://smart-farming-backend.herokuapp.com/expert/login", data)
  //     .then((response) => {
  //       this.dataFetched = true;
  //       console.log(response.data);

  //       if (response.data.status === 1) {
  //         console.log("Correct Login");
  //         this.authenticated = true;
  //         return true;
  //       } else {
  //         // toReturn = false;
  //         this.authenticated = false;
  //         return false;
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       // this.authenticated = false;
  //       return false;
  //     });
  // }

  async login(email, password) {
      var isAuth = await this.checkAdminCreds(email, password);
      console.log(isAuth);
      if (this.authenticated === true) {
        // this.authenticated = true;
        localStorage.setItem("email", email);
        localStorage.setItem("authenticated", "true");
        return true;
      } else {
        return false;
      }

    // var isAuth = await this.checkExpertCreds(username, password);
    // console.log(isAuth);
    // if (this.authenticated === true) {
    //   this.authenticated = true;
    //   localStorage.setItem("username", username);
    //   localStorage.setItem("type", "expert");
    //   localStorage.setItem("authenticated", "true");

    //   return true;
    // } else {
    //   return false;
    // }
  }

  logout() {
    if (
      localStorage.getItem("authenticated") == "true" &&
      localStorage.getItem("username") != null
    ) {
      console.log("Logout Called");
      this.authenticated = false;
      localStorage.removeItem("username");
      localStorage.removeItem("authenticated");
    }
    return true;
  }

  isAuthenticated(admin) {
    console.log(localStorage);
    if (admin) {
      return (
        // this.authenticated &&
        localStorage.getItem("authenticated") == "true" &&
        // localStorage.getItem("username") != null &&
        localStorage.getItem("type") === "admin"
      );
    }
    return localStorage.getItem("authenticated") == "true";
  }

  getUsername() {
    return localStorage.getItem("username");
  }
}

export default new Auth();
