import React, { useState, useEffect } from "react";
import "./Complaints.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faPlus,
  faEye,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";

import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

function Complaints() {
  const [todos, setTodos] = useState([]);
  const [currentResults, setCurrentResults] = useState([]);

  const alert = useAlert();

  const columns = [
    {
      name: "Complaint by",
      selector: "Complaint",
      sortable: true,
      maxWidth: "20%",
    },
    {
      name: "Date",
      selector: "Date",
      sortable: true,
    },
    {
      name: "View",
      selector: "viewAction",
      sortable: false,
      maxWidth: "5%",
      cell: (row) => (
        <div>
          <Link to={"/" + row._id}>
            <button className="table-view-button table-button">
              <FontAwesomeIcon
                className="view-icon table-button-icon"
                icon={faEye}
              />
            </button>
          </Link>
        </div>
      ),
    },
    {
      name: "Delete",
      selector: "deleteAction",
      sortable: false,
      maxWidth: "5%",
      cell: (row) => (
        <div className="table-button-cell">
          <button
            className="table-delete-button table-button"
            onClick={() => {
              deletePest(row._id);
            }}
          >
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="table-button-icon"
              style={{ marginRight: "10px" }}
            />
          </button>
        </div>
      ),
    },
  ];

  const deletePest = (id) => {
    console.log("Clicked");
    axios
      .delete("/" + id)
      .then((response) => {
        if (response.data.status == 1) {
          alert.show("Complaint Deleted Successfully");
        } else {
          alert.show("Some Error Occured. Not Deleted");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Some Error Occured");
      });
  };

  const onSearchHandler = (event) => {
    var query = event.target.value.toLowerCase();
    setCurrentResults(
      todos.filter(
        (x) =>
          x.pestName.toLowerCase().includes(query) ||
          x.severity.toLowerCase().includes(query)
      )
    );
  };


  return (
    <div className="view-page-body">
      <div className="view-page-card">
      <h1 className="view-page-heading"> Complaints</h1>

      <div className="data-table-div">
        <input
          type="text"
          onChange={onSearchHandler}
          placeholder="Enter here to Search"
        />

        <DataTable
          columns={columns}
          data={currentResults}
          noHeader
          highlightOnHover
          className="item-data-table"
          sortIcon={
            <FontAwesomeIcon icon={faSort} style={{ marginRight: "10px" }} />
          }
          pagination
        />
      </div>
      </div>
      
    </div>
  );
}

export default Complaints;
