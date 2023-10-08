import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { baseURL } from '../../utils/constants';
import axios from 'axios';
import { useAlert } from '../../context/AlertContext';
import { useFormik } from "formik";
import { AddTaskSchema } from '../../schemas/AddTaskSchema';

const initialValues = {
    title: "",
    description: ""
  };

const CreateTaskPopup = ({modal, toggle, save, header, plantId}) => {
    // const [taskName, setTaskName] = useState('');
    // const [description, setDescription] = useState('');
    const { alert, showAlert } = useAlert();
    // const [errors, setErrors] = useState({})

    // const handleChange = (e) => {
        
    //     const {name, value} = e.target

    //     if(name === "taskName"){
    //         setTaskName(value)
    //     }else{
    //         setDescription(value)
    //     }


    // }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: AddTaskSchema,
      onSubmit: (values, action) => {
        handleSave(values);
        action.resetForm();
      },
    });


    const handleSave = (values) => {
        // e.preventDefault()
    //     const validationErrors = {}
    // if(!taskName.trim()) {
    //     validationErrors.taskName = "Task title is required"
    // }
    // if(!description.trim()) {
    //     validationErrors.description = "Description is required"
    // }
    // setErrors(validationErrors);
    // if(Object.keys(validationErrors).length === 0) {
        // let taskObj = {}
        // taskObj["title"] = taskName
        // taskObj["description"] = description
        // taskObj["plantId"] = plantId
        // console.log(taskObj);
        try{
        values["plantId"] = plantId
        axios.post(`${baseURL}/task/save`, values ).then((res) => {
            console.log(res.data);
            // setTaskName("");
            // setDescription("");
            save();
            showAlert("Your task got added successfully!!", "success");
        })
        }
        catch(e){
            showAlert("Sorry!! Your task was not added", "danger");
        }
    // }
        
    }

    return (
        <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader style={{"backgroundColor": "#AED581"}} toggle={toggle}>{header}</ModalHeader>
            
            <ModalBody style={{"backgroundColor": "#AED581"}}>
            <form id="addTaskForm" onSubmit={handleSubmit}>
                    <div className = "form-group mb-2">
                        <label htmlFor="title">Task Title</label>
                        <input type="text" id='title' className = "form-control" autoComplete="off" value = {values.title} onChange = {handleChange} onBlur={handleBlur} name = "title"/>
                        {errors.title && touched.title ? (
                      <p className="form-error">{errors.title}</p>
                    ) : null}
                    </div>
                    <div className = "form-group">
                        <label htmlFor='description'>Description</label>
                        <textarea rows = "5" className = "form-control" autoComplete="off" value = {values.description} onChange = {handleChange} onBlur={handleBlur} name = "description"></textarea>
                        {errors.description && touched.description ? (
                      <p className="form-error">{errors.description}</p>
                    ) : null}
                    </div>
                    </form>
            </ModalBody>
            <ModalFooter style={{"backgroundColor": "#AED581"}}>
            <Button color="success" type="submit" form='addTaskForm'>Create</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default CreateTaskPopup;