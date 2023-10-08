import React, { useEffect, useState } from "react";
import CreateTask from "../modals/AddTasks";
import TaskCard from "./TaskCard.js";
import "../Plant-style.css";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import { useParams } from "react-router-dom";
import MyPagination from "../common/MyPagination.js";

const TaskList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { plantId } = useParams();
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);

  const totalPages = Math.ceil(taskList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = taskList.slice(startIndex, endIndex);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  useEffect(() => {
    axios.get(`${baseURL}/task/getByPlantId/${plantId}`).then((res) => {
      console.log(res.data);
      setTaskList(res.data);
    });
  }, [updateUI]);

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = () => {
    setModal(false);
    setUpdateUI((prevState) => !prevState);
    console.log("saveTask!!");
  };

  return (
    <>
      <div className="header text-center my-10">
        <h3>Task List</h3>
        <button className="btn btn-success mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>
      <div className="task-container">
        {displayedData.length > 0 ? (
          displayedData.map((task) => (
            <TaskCard
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              setUpdateUI={setUpdateUI}
              plantId={plantId}
            />
          ))
        ) : (
          <div className="container d-flex justify-content-center align-items-center">
            There are no tasks to display!!
          </div>
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
      <CreateTask
        toggle={toggle}
        modal={modal}
        save={saveTask}
        plantId={plantId}
        header="Create Task"
      />
    </>
  );
};

export default TaskList;
