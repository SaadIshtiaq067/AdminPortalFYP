import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./dashboard.css";
import DataTable from "react-data-table-component";

import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBug,
  faLeaf,
  faMobile,
  faHandMiddleFinger,
  faQuestion,
  faStarOfLife,
  faStar,
  faPersonBooth,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {},
      TotalPatients: [],
      ComplaintsCount: 0,
    };
    this.token = localStorage.getItem("token");
  }
  componentDidMount() {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.token,
    };

    // Fetching Stats Data
    Axios.get(
      ""
    ).then((response) => {
      console.log("Stats Response");
      console.log(response);
      this.setState({
        diseaseCount: response.data.diseasees,
        feedbackCount: response.data.feedbacks,
      });
    });

    Axios.get("")
      .then((response) => {
        this.setState({
          latestDetections: response.data.results,
          feedbackCount: response.data.results.length,
        });
        console.log(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });

    Axios.get(
      "",
      { headers: headers }
    ) //check the localhost link

      .then((res) => {
        console.log(res);
        let labels_ = [];
        let data_ = [];

        for (const dataObj of res.data) {
          labels_.push(dataObj._id);

          data_.push(dataObj.count);
        }
        this.setState({
          chartData: {
            labels: labels_,
            datasets: [
              {
                label: "Detections",
                data: data_,
                backgroundColor: [
                  "#3949ab ",
                  "#2196f3",
                  "#26c6da",
                  "#d4e157",
                  "#673ab7",
                  "#e91e63",
                  "#66bb6a",
                  "#c0ca33",
                  "#fdd835",
                  "#3949ab",
                ],
                hoverBackgroundColor: [
                  "#501800",
                  "#4B5000",
                  "#175000",
                  "#003350",
                  "#35014F",
                ],
              },
            ],
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="content-wrapper dashboard-page-body">
        <section className="numbers-section">
          <div className="number-div">
            <h2 className="number-count">{this.state.diseaseCount}</h2>
            <h5 className="number-heading">
              <FontAwesomeIcon className="number-icon" icon={faUser} />
              Total patients
            </h5>
          </div>
          <div className="number-div">
            <h2 className="number-count">{this.state.feedbackCount}</h2>
            <h5 className="number-heading">
              <FontAwesomeIcon className="number-icon" icon={faCommentAlt} />
              Complaints
            </h5>
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;
