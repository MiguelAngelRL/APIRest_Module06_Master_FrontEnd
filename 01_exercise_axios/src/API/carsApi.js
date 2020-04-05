import axios from "axios";
import { emptyCar } from "../uiHelpers";

const baseUrl = 'http://localhost:3050';

export const getAllCars = () => {
    return axios.get(`${baseUrl}/api/cars`)
                .then(result => result.data.map((i)=>i));
}

export const getCarById = (id) => {
    return axios.get(`${baseUrl}/api/cars/${id}`)
                .then(result => result.data)
                .catch((err) => {
                    handleError(id);
                    return emptyCar();
                });    
}

export const addCar = (car) => {
    return axios.post(`${baseUrl}/api/cars`, car);
};

export const modifyCar = (car, id) => {
    return axios.put(`${baseUrl}/api/cars/${id}`, car)
                .catch((err) => handleError(id));
};

export const deleteCar = (id) => {
    return axios.delete(`${baseUrl}/api/cars/${id}`)
                .catch((err) => handleError(id));    
};

const handleError = (id) => alert(`El coche con id ${id} no existe en la base de datos`);