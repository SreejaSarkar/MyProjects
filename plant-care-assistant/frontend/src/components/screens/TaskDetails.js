import React, { useEffect, useState } from "react";
import "../Plant-style.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import CircularProgressBar from "../common/CircularProgressBar";
import { Button } from "reactstrap";
import Breadcrumb from "../common/Breadcrumb";

const TaskDetails = () => {
  const { id, plantId } = useParams();
  const [taskData, setTaskData] = useState([]);
  const [observation, setObservation] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const breadCrumbData = [{
    label: "Task",
    url: `/taskList/${plantId}`
  },
    {
      label: "TaskDetails",
      url: `/taskDetails/${plantId}/${id}`
    }]

  useEffect(() => {
    console.log("hii");
    axios.get(`${baseURL}/task/getById/${id}`).then((res) => {
      console.log(res.data);
      setTaskData(res.data);
      setPercentage(res.data[0]?.progress);
    });
  }, [updateUI]);

  const handleObservation = (e) => {
    const { value } = e.target;
    setObservation(value);
  };

  const updateObservation = (e) => {
    e.preventDefault();
    let finalObservation = observation;

    if (taskData[0].observation) {
      finalObservation = taskData[0].observation + " " + observation;
    }
    axios
      .put(`${baseURL}/task/update/${id}`, { observation: finalObservation })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setObservation("");
      });
  };

  const updateProgress = (e) => {
    e.preventDefault();
    axios
      .put(`${baseURL}/task/update/${id}`, { progress: percentage })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
      });
  };

  return (
    <>
      <div className="header text-center my-10">
        <Breadcrumb breadCrumbData={breadCrumbData}/>
        <h3>Task Details</h3>
      </div>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div style={{ width: "70%", padding: "20px" }}>
          <section className="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="main-heading">Title</h3>
                  <div className="underline"></div>
                  <p>{taskData.length > 0 ? taskData[0].title : ""}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="main-heading">Description</h3>
                  <div className="underline" style={{ width: "9rem" }}></div>
                  <p>{taskData.length > 0 ? taskData[0].description : ""}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="main-heading">Observations</h3>
                  <div className="underline" style={{ width: "9rem" }}></div>
                  <p>
                    {taskData.length > 0
                      ? taskData[0].observation
                        ? taskData[0].observation
                        : "No observations yet"
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div style={{ width: "45%", padding: "20px", marginTop: "60px" }}>
          <CircularProgressBar percentage={percentage} circleWidth="200" />
          <input
            type="range"
            className="progressInput"
            min="1"
            max="100"
            step="1"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          />
          <div style={{ marginLeft: "35px" }}>
            <Button className="btn btn-success mt-3" onClick={updateProgress}>
              Save your progress
            </Button>
          </div>
        </div>
      </div>
      <section className="section mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h6 className="text-center">
                Share your thoughts and opinions about this task.(Any
                challenges/unsual observations?)
              </h6>
              <div className="d-flex justify-content-center">
                <textarea
                  rows="5"
                  className="form-control w-50"
                  value={observation}
                  onChange={handleObservation}
                  name="observation"
                ></textarea>
              </div>
              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-success px-4 py-2"
                  onClick={updateObservation}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TaskDetails;
