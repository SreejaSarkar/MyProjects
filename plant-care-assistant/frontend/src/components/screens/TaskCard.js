import axios from 'axios';
import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';
import { baseURL } from '../../utils/constants';
import "../Plant-style.css";
import UpdateTask from '../modals/UpdateTask';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';

const TaskCard = ({id, title, description, setUpdateUI, plantId} ) => {
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const { alert, showAlert } = useAlert();

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = () => {
        setModal(false);
        setUpdateUI((prevState) => !prevState);
    };

    const handleDelete = () => {
        try{
        axios.delete(`${baseURL}/task/delete/${id}`).then((res) => {
            setUpdateUI((prevState) => !prevState);
            showAlert("Your task got deleted successfully!!", "success");
        })
        }
        catch(e)
        {
            console.log("Error: ", e);
            showAlert("Sorry!! Your task didnot get deleted", "danger");   
        }
        
    }

    return (
        <div className = "card-wrapper m-2">
            <div className = "card-top bg-success"></div>
            <div className = "task-holder">
                <span className = "card-header" style={{"backgroundColor": "#AED581", "borderRadius": "10px"}}>{title}</span>
                <p className = "mt-3">{description}</p>

                <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                {/* <i class="fas fa-arrow-right"></i> */}
                {/* <i class="fa-solid fa-arrow-right-to-bracket"></i> */}

                    <i className = "far fa-edit mx-2" style={{"color" : "#28a745", "cursor" : "pointer"}} onClick = {() => setModal(true)}></i>
                    <i className="fas fa-trash-alt mx-3" style = {{"color" : "#28a745", "cursor" : "pointer"}} onClick = {handleDelete}></i>
                    <i className="fa-solid fa-arrow-right-to-bracket" style = {{"color" : "#28a745", "cursor" : "pointer"}} onClick = {() => navigate(`/taskDetails/${plantId}/${id}`)}></i>
                </div>
        </div>
        <UpdateTask id = {id} modal = {modal} toggle = {toggle} updateTask = {updateTask} title = {title} description = {description} header = "Update Task"/>
        </div>
    );
};

export default TaskCard;