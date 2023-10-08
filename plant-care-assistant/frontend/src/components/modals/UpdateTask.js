import React, { useState , useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { useFormik } from "formik";
import { baseURL } from '../../utils/constants';
import { useAlert } from '../../context/AlertContext';
import { AddTaskSchema } from '../../schemas/AddTaskSchema';


const UpdateTask = ({id, modal, toggle, updateTask, title, description, header}) => {

    const { alert, showAlert } = useAlert();

    const initialValues = {
        title: title,
        description: description
      };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: AddTaskSchema,
      onSubmit: (values, action) => {
        handleUpdate(values);
        action.resetForm();
      },
    });
  
    useEffect(() => {
        values.title = title;
        values.description = description;
      }, [title, description]);
    

    const handleUpdate = (values) => {
        try{
        axios.put(`${baseURL}/task/update/${id}`, values).then((res) => {
            console.log(res.data);
            updateTask();
            showAlert("Your task got updated successfully", "success");
        });
        }
        catch(e){
            console.log("Error: ", e);
            showAlert("Sorry!! Your task did not get updated", "danger");
        }
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader style={{"backgroundColor": "#AED581"}} toggle={toggle}>{header}</ModalHeader>
            <ModalBody style={{"backgroundColor": "#AED581"}}>
                <form id="updateTaskForm" onSubmit={handleSubmit}>
                    <div className = "form-group">
                        <label>Task Title</label>
                        <input type="text" className = "form-control" value = {values.title} onChange = {handleChange} onBlur={handleBlur} name = "title"/>
                        {errors.title && touched.title ? (
                      <p className="form-error">{errors.title}</p>
                    ) : null}
                    </div>
                    <div className = "form-group">
                        <label>Description</label>
                        <textarea rows = "5" className = "form-control" value = {values.description} onChange = {handleChange} onBlur={handleBlur} name = "description"></textarea>
                        {errors.description && touched.description ? (
                      <p className="form-error">{errors.description}</p>
                    ) : null}
                    </div>
                </form>
            </ModalBody>
            <ModalFooter style={{"backgroundColor": "#AED581"}}>
            <Button color="primary" type='submit' form='updateTaskForm'>Update</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default UpdateTask;