import "../Plant-style.css";
import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { useFormik } from "formik";
import { baseURL } from "../../utils/constants";
import { useAlert } from '../../context/AlertContext';
import { UserPlantSchema } from "../../schemas/UserPlantSchema";

const UpdatePlant = ({ id, modal, toggle, updatePlant, name, description, photo, photoName }) => {
  // const [plantName, setPlantName] = useState("");
  // const [plantDescription, setPlantDescription] = useState("");
  // const [plantPhoto, setPlantPhoto] = useState("No photo chosen");
  // const [plantPhotoName, setPlantPhotoName] = useState("");
  const [flag, setFlag] = useState(false);
  const { alert, showAlert } = useAlert();

  const initialValues = {
    name: name,
    description: description,
    image: photo,
    imageName: photoName
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
  useFormik({
    initialValues,
    validationSchema: UserPlantSchema,
    onSubmit: (values, action) => {
      handleUpdate(values);
      action.resetForm();
    },
  });

  useEffect(() => {
    values.name = name;
    values.description = description;
    values.image = photo;
    values.imageName = photoName;
  }, [name, description, photo, photoName]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === "plantName") {
  //     setPlantName(value);
  //   } else {
  //     setPlantDescription(value);
  //   }
  // };

  const fileInputField = useRef(null);

  // const handleFileChange = (e) => {
  //   setPlantPhoto(e.target.files[0]);
  //   setPlantPhotoName(e.target.files[0].name);
  //   setFlag(true)
  // };

  const handleUpdate = (values) => {
    // e.preventDefault();
    const formData = new FormData();
  formData.append('name', values.name);
  formData.append('description', values.description);
  // if (flag) 
  formData.append('image', values.image);
  formData.append('imageName', values.image.name);
    console.log(formData);
    try{
    axios.put(`${baseURL}/userPlant/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      }).then((res) => {
        console.log(res.data);
        updatePlant();
        showAlert("Your plant got updated successfully", "success");
    });
  }
  catch(e){
    console.log("Error: ", e);
    showAlert("Sorry!! Your plant did not get updated", "danger");
  }
}
//   useEffect(() => {
//     setPlantName(name)
//     setPlantDescription(description)
//     setPlantPhoto(photo)
//     setPlantPhotoName(photoName)
// },[])

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader style={{ backgroundColor: "#AED581" }} toggle={toggle}>
        Update Plant
      </ModalHeader>
      <ModalBody style={{ backgroundColor: "#AED581" }}>
      <form id="userPlantForm" onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label>Plant Name</label>
          <input
            type="text"
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
          <label>Description</label>
          <textarea
            rows="5"
            className="form-control"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            name="description"
          ></textarea>
          {errors.description && touched.description ? (
                      <p className="form-error">{errors.description}</p>
                    ) : null}
        </div>
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
              <a>{values.image.name? values.image.name : values.imageName}</a>
            </div>
          </div>
        </div>
        </form>
      </ModalBody>
      <ModalFooter style={{ backgroundColor: "#AED581" }}>
        <Button color="success" type="submit" form="userPlantForm">
          Update
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdatePlant;
