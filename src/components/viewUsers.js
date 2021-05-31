import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faEdit,
  faEye,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
import { useAlert } from "react-alert";

function ViewUsers() {
  const [todos, setTodos] = useState([]);
  const [currentResults, setCurrentResults] = useState([]);

  alert = useAlert();

  const columns = [
    
    {
      name: "Name",
      selector: "name",
      sortable: true,
      maxWidth: "20%",
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Age",
      selector: "username",
      sortable: false,
    },
    {
      name: "Gender",
      selector: "gender",
      sortable: true,
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
              deleteUser(row.username);
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

  const onSearchHandler = (event) => {
    var query = event.target.value.toLowerCase();
    setCurrentResults(
      todos.filter(
        (x) =>
          x.username.toLowerCase().includes(query) ||
          x.name.toLowerCase().includes(query)
      )
    );
  };

  const deleteUser = (uname) => {
    if (!window.confirm("Are you sure you wish to delete this item?")) {
      return;
    }
    console.log("Clicked");
    axios
      .delete("" + uname)
      .then((response) => {
        if (response.data.status === 1) {
          alert.show("Patient Deleted Successfully", { title: "Success" });
        } else {
          alert.show("Some Error Occured. Not Deleted", { title: "Failure" });
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Some Error Occured");
      });
  };

  const todoList = () => {
    return todos.map((todos, index) => {
      const { name, email, age, gender, address, picturePath } = todos; //destructuring
      return (
        <tr key={index}>
          <td>{name}</td>
          <td>{email}</td>
          <td>{age}</td>
          <td>{gender}</td>
          <td>{address}</td>
          <td>
            <button>
              <FontAwesomeIcon icon={faEdit} style={{ marginRight: "10px" }} />
            </button>
            <button>
              <FontAwesomeIcon icon={faEye} style={{ marginRight: "10px" }} />
            </button>
            <button
              onClick={() => {
                this.deleteUser(name);
              }}
            >
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ marginRight: "10px" }}
              />
            </button>
          </td>
        </tr>
      );
    });

  };

  return (
    <div className="view-page-body">
      <div className="view-page-card">
        <h1 className="view-page-heading">Registered Dyslexia Patients</h1>
        <div className="data-table-div">
          <input
            type="text"
            onChange={onSearchHandler}
            placeholder="Search User here"
          />

          <DataTable
            columns={columns}
            data={currentResults}
            className="item-data-table"
            noHeader
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

export default ViewUsers;
