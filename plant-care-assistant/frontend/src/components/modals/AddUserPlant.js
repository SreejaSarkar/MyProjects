import "../Plant-style.css";
import React, { useState, useRef, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { useFormik } from "formik";
import { baseURL } from "../../utils/constants";
import { useAlert } from '../../context/AlertContext';
import { UserContext } from "../../context/UserContext";
import { UserPlantSchema } from "../../schemas/UserPlantSchema";

const AddPlant = ({ modal, toggle, save }) => {
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [photo, setPhoto] = useState("No photo chosen");
  const { alert, showAlert } = useAlert();
  const { user } = useContext( UserContext );

  const initialValues = {
    name: "",
    description: "",
    image: null
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: UserPlantSchema,
      onSubmit: (values, action) => {
        handleSave(values);
        action.resetForm();
      },
    });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === "name") {
  //     setName(value);
  //   } else {
  //     setDescription(value);
  //   }
  // };

  const fileInputField = useRef(null);

  // const handleFileChange = (e) => {
  //   setPhoto(e.target.files[0]);
  // };

  const handleSave = (values) => {
    // e.preventDefault();
    console.log("values: ", values)
    const formData = new FormData();
  formData.append('name', values.name);
  formData.append('description', values.description);
  formData.append('image', values.image);
  formData.append('imageName', values.image.name);
  formData.append('userEmail', user.email);
    console.log(formData);
    try{
    axios.post(`${baseURL}/userPlant/save`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    }).then((res) => {
      console.log(res.data);
      // setName("");
      // setDescription("");
      // setPhoto("");
      save();
      showAlert("Your plant got added successfully!!", "success");
    });
  }
  catch(e){
    console.log("Error: ", e);
    showAlert("Sorry!! Your plant did not get added", "danger");
  }
  };

  console.log("image name: ", values.image);

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader style={{ backgroundColor: "#AED581" }} toggle={toggle}>
        Add new Plant
      </ModalHeader>
      <ModalBody style={{ backgroundColor: "#AED581" }}>
      <form id="userPlantForm" onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="name">Plant Name</label>
          <input
            id="name"
            type="text"
            autoComplete="off"
            className="form-control"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
          />
          {errors.name && touched.name ? (
                      <p className="form-error">{errors.name}</p>
                    ) : null}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="5"
            className="form-control"
            autoComplete="off"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            name="description"
          ></textarea>
          {errors.description && touched.description ? (
                      <p className="form-error">{errors.description}</p>
                    ) : null}
        </div>
        {/* <div className="form-group mb-2">
          <label>Upload a photo</label>
          <input
            type="file"
            className="form-control-file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />
        </div> */}
        <div className="container">
          <p className="my-1">Upload a photo of the plant</p>
          <input
            id="file-upload"
            type="file"
            name="image"
            onChange={(event) => {
              const file = event.currentTarget.files[0];
              setFieldValue('image', file);
              handleBlur(event);
            }}
            onBlur={handleBlur}
            ref={fileInputField}
          />
          {errors.image && touched.image ? (
                      <p className="form-error">{errors.image}</p>
                    ) : null}
          <div className="file-search-button">
            <label
              htmlFor="file"
              className="custom-file-upload me-2"
              onClick={() => fileInputField.current.click()}
            >
              <i className="fa fa-plus"></i>
              BROWSE FOR A FILE
            </label>
            <div className="fileName">
              <a>{values.image? values.image.name : "No file chosen"}</a>
            </div>
          </div>
        </div>
      </form>
      </ModalBody>
      <ModalFooter style={{ backgroundColor: "#AED581" }}>
        <Button color="success" type="submit" form="userPlantForm">
          Create
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddPlant;
