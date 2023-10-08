import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { baseURL } from "../../utils/constants";
import axios from "axios";
import "../Plant-style.css";

const AboutPlant = ({ modal, toggle, plant }) => {
  
    console.log("plant: ", plant);
  return (
    <Modal isOpen={modal} toggle={toggle} size="xl">
      <ModalHeader style={{ backgroundColor: "#AED581", textAlign: "center", display: "flex", justifyContent: "center" }} toggle={toggle}>
        {plant?.name}
      </ModalHeader>
      <ModalBody style={{ backgroundColor: "#AED581", maxHeight: "450px", overflowY: "auto" }}>
        <div>
          <section >
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="main-heading">Appearance</h3>
                  <div className="underline" style={{ width: "9rem" }}></div>
                  <p>{plant?.appearance}</p>
                </div>
              </div>
            </div>
          </section>

          <section >
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="main-heading">Growth and Care</h3>
                  <div className="underline" style={{ width: "9rem" }}></div>
                  <p>{plant?.growthCare}</p>
                </div>
              </div>
            </div>
          </section>

          <section >
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="main-heading">Usage</h3>
                  <div className="underline" style={{ width: "9rem" }}></div>
                  <p>{plant?.usage}</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="main-heading">Areas</h3>
                  <div className="underline" style={{ width: "9rem" }}></div>
                  <p>{plant?.areas}</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </ModalBody>
      <ModalFooter style={{ backgroundColor: "#AED581" }}>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AboutPlant;
