import React, { useState, useEffect } from "react";
import "../Plant-style.css";
import Lotus from "../../assets/Lotus.jpg";
import Neem from "../../assets/Neem.jpg";
import ChineseHibiscus from "../../assets/Chinese hibiscus.jpg";
import CottonPlant from "../../assets/Cotton Plant.jpg";
import Rose from "../../assets/Rose.jpg";
import Sandalwood from "../../assets/Sandalwood.jpg";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import AboutPlant from "../modals/AboutPlant";
import { Button } from "reactstrap";
import MyPagination from "../common/MyPagination";

const PlantsDetails = () => {
  const [modal, setModal] = useState(false);
  const [plantsList, setPlantsList] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(plantsList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = plantsList.slice(startIndex, endIndex);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  const imageMap = {
    Lotus,
    Neem,
    "Chinese Hibiscus": ChineseHibiscus,
    "Cotton Plant": CottonPlant,
    Rose,
    Sandalwood,
  };

  useEffect(() => {
    axios.get(`${baseURL}/plant/getAll`)
    .then((res) => {
        console.log(res.data);
        setPlantsList(res.data);
    })
  }, [])

  const toggle = (plant) => {
    setSelectedPlant(plant);
    setModal(!modal);
  }

  return (
    <>
    <div className="my-10">
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="main-heading text-center">
                Learn more about Plants
              </h3>
              <div
                className="underline mx-auto"
                style={{ width: "18rem" }}
              >
              </div>
                <p className="mt-4">
                Plants are a diverse group of multicellular organisms that
                belong to the kingdom Plantae. They play a vital role in
                ecosystems and are essential to life on Earth. They have a cell
                wall made of cellulose, which provides structural support. Most
                plants are autotrophic, meaning they can produce their own food
                through photosynthesis, using sunlight, carbon dioxide, and
                water to create glucose and oxygen. Plants typically have a life
                cycle that alternates between two generations: the sporophyte
                (diploid) and the gametophyte (haploid). Plants can reproduce
                both sexually and asexually. There are various groups of plants,
                including Vascular Plants, Non-Vascular Plants, Angiosperms and
                Gymnosperms.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section border-top">
        <div className="container">
          <div className="row">
          {displayedData.map((plant) => { 
            return(
              <>
            <div key={plant._id} className="col-md-4">
              <div className="card text-center my-2">
                <div className="overflow">
                  <img src={imageMap[plant.name]} alt="image1" className="card-img-top" />
                </div>
                <div className="card-body text-dark">
                  <h4 className="card-title">{plant.name}</h4>
                  <p className="card-text text-secondary">
                    {plant.description}
                  </p>
                  <Button className="btn btn-success" onClick = {() => toggle(plant)}>
                    Read more
                  </Button>
                </div>
              </div>
            </div>
            <AboutPlant toggle = {toggle} modal = {modal} plant = {selectedPlant}/>
            </>
            );
          })}
          </div>
        </div>
      </section>

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

    </div>
    
    </>
  );
};

export default PlantsDetails;
