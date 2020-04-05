import { emptyCar } from "../uiHelpers";

const baseUrl = 'http://localhost:3050';

export const getAllCars = async() => {
    try{
        const result = await fetch(`${baseUrl}/api/cars`);
        if(!result.ok) {
            throw Error(result.status);
        } else{
            return result.json();
        }
    } catch(err) {
        alert(`No se puede obtener la lista de coches. Error: ${err}`);
    }
}

export const getCarById = async(id) => {
    try{
        const result = await fetch(`${baseUrl}/api/cars/${id}`);
        if(!result.ok) {
            throw Error(result.status);
        } else{
            return result.json();
        }
    } catch(err){
        handleError(id);
        return emptyCar();
    }
}

export const addCar = async(car) => {
    try{
        const result = await fetch(`${baseUrl}/api/cars`, 
                                    {
                                        method: "POST", 
                                        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, 
                                        body: JSON.stringify(car)
                                    }
                                );
        if(!result.ok)
            throw Error(result.status);
    } catch(err){
        alert(`El alta del nuevo coche ha fallado con el código de error: ${err}`);
    }
};

export const modifyCar = async(car, id) => {
    try{
        const result = await fetch(`${baseUrl}/api/cars/${id}`,  
                                    {
                                        method: "PUT", 
                                        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, 
                                        body: JSON.stringify(car)
                                    });

        if(!result.ok)
            throw Error(result.status);
    } catch(err){
        handleError(id);
    }
};

export const deleteCar = async(id) => {
    try{
        const result = await fetch(`${baseUrl}/api/cars/${id}`, {method: "DELETE"});
        if(!result.ok) {
            throw Error(result.status);
        }
    } catch(err){
        handleError(id);
    }
};

const handleError = (id) => alert(`El coche con id ${id} no existe en la base de datos`);