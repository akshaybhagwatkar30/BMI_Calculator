import React, { useState } from "react";
import "./App.css";

                                           // use data
const BMI_CATEGORIES = {
  UNDERWEIGHT: "Underweight",
  NORMAL: "Normal Weight",
  OVERWEIGHT: "Overweight",
  OBESE: "Obese",
  SEVERELY_OBESE: "Severely Obese",
};

const BMI_THRESHOLDS = {
  UNDERWEIGHT: 18.5,
  NORMAL: 24.9,
  OVERWEIGHT: 29.9,
  OBESE: 39.9,
};
                                      // return part start
const BMICalculator = () => {
  const [formData, setFormData] = useState({ height: "", weight: "" });
  const [imc, setImc] = useState(null);
  const [imcText, setImcText] = useState("");
  const [imcBarWidth, setImcBarWidth] = useState("0%");
  const [imcClass, setImcClass] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateImc = (e) => {
    e.preventDefault();
    const { height, weight } = formData;

    if (!height || !weight) return;

    const heightInMeters = height / 100;
    const calculatedImc = weight / (heightInMeters * heightInMeters);

    setImc(calculatedImc);
    const { text, className } = getImcText(calculatedImc);
    setImcText(text);
    setImcClass(className);
    setImcBarWidth(getImcBarWidth(calculatedImc));
  };

  const getImcText = (calculatedImc) => {
    if (calculatedImc <= BMI_THRESHOLDS.UNDERWEIGHT) {
      return { text: BMI_CATEGORIES.UNDERWEIGHT, className: "imc-underweight" };
    }
    if (calculatedImc <= BMI_THRESHOLDS.NORMAL) {
      return { text: BMI_CATEGORIES.NORMAL, className: "imc-normal" };
    }
    if (calculatedImc <= BMI_THRESHOLDS.OVERWEIGHT) {
      return { text: BMI_CATEGORIES.OVERWEIGHT, className: "imc-overweight" };
    }
    if (calculatedImc <= BMI_THRESHOLDS.OBESE) {
      return { text: BMI_CATEGORIES.OBESE, className: "imc-obese" };
    }
    return {
      text: BMI_CATEGORIES.SEVERELY_OBESE,
      className: "imc-severely-obese",
    };
  };

  const getImcBarWidth = (calculatedImc) => {
    if (calculatedImc <= 15) return "0%";
    if (calculatedImc >= 50) return "100%";
    return `${((calculatedImc - 15) * 100) / 35}%`;
  };

  const reload = () => {
    setFormData({ height: "", weight: "" });
    setImc(null);
    setImcText("");
    setImcClass("");
    setImcBarWidth("0%");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="app">
      <div className="container">
        <h2>BMI Calculator</h2>
        <form onSubmit={calculateImc}>
          <div>
            <span htmlFor="height">Height (cm)</span>
            <input
              type="number"
              name="height"
              max="200"
              value={formData.height}
              onChange={handleChange}
              placeholder="Enter height"
              required
            />
          </div>
          <div>
            <span htmlFor="weight">Weight (kg)</span>
            <input
              type="number"
              name="weight"
              max="300"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Enter weight"
              required
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn btn-outline" onClick={reload} type="button">
              Reload
            </button>
          </div>
        </form>
        <div>
          <h4 id="imcData" className={imcClass}>
            BMI: {imc ? `${imc.toFixed(2)} (${imcText})` : ""}
          </h4>
          <div id="imcContainer">
            <div id="IMCbar" style={{ width: imcBarWidth }}></div>
          </div>
        </div>
        <button className="btn" onClick={toggleModal}>
          More Information
        </button>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={toggleModal}>
                &times;
              </span>
              <h3>What is the body mass index (BMI)?</h3>
              <p>
                The body mass index (BMI) is a measure that uses your height and
                weight to work out if your weight is healthy. The BMI
                calculation divides an adult's weight in kilograms by their
                height in metres squared.
              </p>
              <h3>BMI ranges</h3>
              <p>If your BMI is:</p>
              <div>
                <li>below 18.5 – you're in the underweight range</li>
                <li>
                  between 18.5 and 24.9 – you're in the healthy weight range
                </li>
                <li>between 25 and 29.9 – you're in the overweight range</li>
                <li>between 30 and 39.9 – you're in the obese range</li>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
