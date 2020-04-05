import { emptyCar } from "../uiHelpers";

const baseUrl = 'http://localhost:3050';

export const getAllCars = () => {
    return new Promise((resolve, reject) => {
        const client = new XMLHttpRequest();
        client.open("get", `${baseUrl}/api/cars`);
        client.onload = (event) => resolve((JSON.parse(event.target.responseText)).map((i)=>i));
        client.onerror = (event) => alert(`Error, la lista no ha podido cargarse: ${errText}`);
        client.send();
    });
}

export const getCarById = (id) => {
    return new Promise((resolve, reject) => {
        const client = new XMLHttpRequest();
        client.open("get", `${baseUrl}/api/cars/${id}`);
        client.onload = (event) => {
            if(event.target.status === 404){
                handle404Error(id);
                return emptyCar();
            } else{
                resolve(JSON.parse(event.target.responseText));
            }
        }
        client.onerror = (event) => handleGenericError("encontrarse", event.target.statusText);
        client.send();
    }); 
}

export const addCar = (car) => {
    return new Promise((resolve, reject) => {
        const client = new XMLHttpRequest();
        client.open("post", `${baseUrl}/api/cars`);
        client.setRequestHeader("Accept", "application/json");
        client.setRequestHeader("Content-Type", "application/json");
        client.onload = (event) => resolve(JSON.parse(event.target.responseText));
        client.onerror = (event) => handleGenericError("añadirse", event.target.statusText);
        client.send(JSON.stringify(car));
    });
};

export const modifyCar = (car, id) => {
    return new Promise((resolve, reject) => {
        const client = new XMLHttpRequest();
        client.open("put", `${baseUrl}/api/cars/${id}`);
        client.setRequestHeader("Accept", "application/json");
        client.setRequestHeader("Content-Type", "application/json");
        client.onload = (event) => {
            if(event.target.status === 404){
                handle404Error(id);
            } else{
                resolve(resolve(event.target.status));
            }
        }
        client.onerror = (event) => handleGenericError("modificarse", event.target.statusText);
        client.send(JSON.stringify(car));
    });
};

export const deleteCar = (id) => {
    return new Promise((resolve, reject) => {
        const client = new XMLHttpRequest();
        client.open("delete", `${baseUrl}/api/cars/${id}`);
        client.onload = (event) => {
            if(event.target.status === 404){
                handle404Error(id);
            } else{
                resolve(event.target.responseText);
            }
        }
        client.onerror = (event) => handleGenericError("borrarse", event.target.statusText);
        client.send();
    });
};

const handle404Error = (id) => alert(`El coche con id ${id} no existe en la base de datos`);
const handleGenericError = (wording, errText) => alert(`El coche no ha podido ${wording}. Error: ${errText}`);