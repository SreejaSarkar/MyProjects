import React, { useContext, useEffect, useRef, useState } from "react";
import Plant from "./UserPlant";
import "../Plant-style.css";
import AddPlant from "../modals/AddUserPlant";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import MyPagination from "../common/MyPagination";
import { UserContext } from '../../context/UserContext';

const PlantsList = () => {
  const { user } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [plantsList, setPlantsList] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(plantsList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = plantsList.slice(startIndex, endIndex);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  console.log("user: ", user)

  const toggle = () => {
    setModal(!modal);
  };

  const savePlant = () => {
    setModal(false);
    setUpdateUI((prevState) => !prevState);
    console.log("saveTask!!");
  };

  useEffect(() => {
    if (user) {
    axios.get(`${baseURL}/userPlant/getByEmailId/${user.email}`).then((res) => {
      console.log(res.data);
      setPlantsList(res.data);
    });}
  }, [user, updateUI]);

  return (
    <>
      <div className="header text-center my-10">
        <h3>Plants List</h3>
        <button className="btn btn-success mt-2" onClick={() => setModal(true)}>
          Add more
        </button>
      </div>
      <div className = "task-container">
        {plantsList.length > 0 ? (
          plantsList.map((plant) => (
            <Plant
                key={plant._id}
                  id={plant._id}
                  name={plant.name}
                  description={plant.description}
                  photo={plant.image}
                  photoName={plant.imageName}
                  setUpdateUI={setUpdateUI}
                />
          ))
        ) : (
          <div className="container d-flex justify-content-center align-items-center">There are no plants to display!!</div>
        )}
      </div>
      {displayedData.length > 0 && (
        <div className="d-flex justify-content-end mx-4">
          <MyPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            startIndex={startIndex}
            endIndex={endIndex}
            numbers={numbers}
            totalPages={totalPages}
          />
        </div>
      )}
      <AddPlant
        toggle={toggle}
        modal={modal}
        save={savePlant}
      />
    </>
  );
};

export default PlantsList;
