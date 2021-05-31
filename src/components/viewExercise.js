import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./viewExercise.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faEye,
  faPlus,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
import { useAlert } from "react-alert";
function ViewExercise() {
  const [todos, setTodos] = useState([]);
  const [currentResults, setCurrentResults] = useState([]);

  const alert = useAlert();

  const columns = [
 
    {
      name: "Questionnaire",
      selector: "QuesName",
      sortable: true,
      maxWidth: "20%",
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
    },
    {
      name: "View",
      selector: "viewAction",
      sortable: false,
      maxWidth: "5%",
      cell: (row) => (
        <div>
          <Link to={"//" + row._id}>
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
      name: "Edit",
      selector: "editAction",
      sortable: false,
      maxWidth: "5%",
      cell: (row) => (
        <div>
          <Link to={"//" + row._id}>
            <button className="table-edit-button table-button">
              <FontAwesomeIcon
                className="view-icon table-button-icon"
                icon={faPencilAlt}
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
      compact: true,
      cell: (row) => (
        <div className="table-button-cell">
          <button
            className="table-delete-button table-button"
            onClick={() => {
              deleteExercise(row._id);
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

  const deleteExercise = (id) => {
    console.log("Clicked");
    axios
      .delete("" + id)
      .then((response) => {
        if (response.data.status === 1) {
          alert.show("Question Deleted Successfully");
        } else {
          alert.show("Some Error Occured. Not Deleted");
        }
      })
      .catch((error) => {
        console.log(error);
        alert.error("Some Error Occured", { title: "Error" });
      });
  };


  const onSearchHandler = (event) => {
    var query = event.target.value.toLowerCase();
    setCurrentResults(
      todos.filter(
        (x) =>
          x.plantName.toLowerCase().includes(query) ||
          x.season.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="view-page-body">
      <div className="view-page-card">
        <h1 className="view-page-heading"> Questionnaire </h1>
        <Link to="/">
          <button className="add-item-button">
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
            Add New Question
          </button>
        </Link>

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

export default ViewExercise;
