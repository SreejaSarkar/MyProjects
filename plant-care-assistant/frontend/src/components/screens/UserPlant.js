import React, { useState } from "react";
import "../Plant-style.css";
import { Link } from 'react-router-dom';
import { Button } from "reactstrap";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import UpdatePlant from "../modals/UpdateUserPlant";
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';

const Plant = ({id, name, description, photo, photoName, setUpdateUI}) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const { alert, showAlert } = useAlert();
  
  const toggle = () => {
    setModal(!modal);
}
console.log("photo data: ", photo);
  const imageDataUrl = `data:image/jpeg;base64,${btoa(
    String.fromCharCode(...new Uint8Array(photo.data.data))
  )}`;

  const handleDelete = () => {

    try{
    axios.delete(`${baseURL}/userPlant/delete/${id}`).then((res) => {
      setUpdateUI((prevState) => !prevState);
      showAlert("Your plant got deleted successfully!!", "success");
  })
}
catch(e){
  showAlert("Sorry!! Your plant didnot get deleted", "danger");
}
  }

  const updatePlant = () => {
    setModal(false);
    setUpdateUI((prevState) => !prevState);
};

const handleCheckDetails = () => {
  // Fetch tasks for the selected plant by making an API request to the backend
  navigate(`/taskList/${id}`);
};

  return (
    <div className="card text-center my-2 mx-4">
        <div className="overflow">
            <img src={imageDataUrl} alt="image1" className="card-img-top" style={{ height: '200px' }}/>
        </div>
        <div className="card-body text-dark">
            <h4 className="card-title">{name}</h4>
            <p className="card-text text-secondary">
            {description}
            </p>
            <Button className="btn btn-success mx-1" onClick = {() => setModal(true)}><i className="fa-solid fa-file-pen text-white bg-success"></i></Button>
            <Button className="btn btn-success mx-1" onClick={handleCheckDetails}>Check details</Button>
            <Button className="btn btn-success mx-1" onClick={handleDelete}><i className="fa-solid fa-trash-can text-white bg-success"></i></Button>
        </div>
        <UpdatePlant id = {id} modal = {modal} toggle = {toggle} updatePlant = {updatePlant} name = {name} description = {description} photo = {photo} photoName = {photoName} />
    </div>
  );
};

export default Plant;
