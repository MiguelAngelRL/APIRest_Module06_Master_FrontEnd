import { emptyCar } from "../uiHelpers";

const baseUrl = 'http://localhost:3060';

export const httpClientService = (() => {
    let headers;
    const getHeaders = () => headers;
    const showError = (err) => {
        const myError = JSON.parse(err.message);
        if(myError.status===401){
            handleSecurityError(myError.status);
            throw new Error(err);
        } else{
            handleError(myError.id);
        }
    }
    const handleError = (id) => alert(`El coche con id ${id} no existe en la base de datos`);
    const handleSecurityError = (err) => alert(`No se puede obtener la lista de coches. Error: ${err}`);
    const myErrorMessage = (status="", id="") => {
        return {status, id};
    }
    
    return {
        setHeaders: (_headers) => headers = _headers,
        getAllCars: async() => {
            try{
                const result = await fetch(`${baseUrl}/api/cars`, {
                    headers: getHeaders()
                });
                if(!result.ok) {
                    throw new Error(JSON.stringify(myErrorMessage(result.status)));
                } else{
                    return result.json();
                }
            } catch(err) {
                showError(err);
            }
        },
        getCarById: async(id) => {
            try{
                const result = await fetch(`${baseUrl}/api/cars/${id}`, {
                    headers: getHeaders()
                });
                if(!result.ok) {
                    throw new Error(JSON.stringify(myErrorMessage(result.status, id)));
                } else{
                    return result.json();
                }
            } catch(err){
                showError(err);
                return emptyCar();
            }
        },
        addCar: async(car) => {
            try{
                const result = await fetch(`${baseUrl}/api/cars`, 
                                            {
                                                method: "POST", 
                                                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', ...getHeaders() }, 
                                                body: JSON.stringify(car)
                                            }
                                        );
                if(!result.ok)
                    throw new Error(JSON.stringify(myErrorMessage(result.status, id)));
            } catch(err){
                showError(err);
            }
        },
        modifyCar: async(car, id) => {
            try{
                const result = await fetch(`${baseUrl}/api/cars/${id}`,  
                                            {
                                                method: "PUT", 
                                                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', ...getHeaders() }, 
                                                body: JSON.stringify(car)
                                            });
        
                if(!result.ok)
                    throw new Error(JSON.stringify(myErrorMessage(result.status, id)));
            } catch(err){
                showError(err);
            }
        },
        deleteCar: async( id) => {
            try{
                const result = await fetch(`${baseUrl}/api/cars/${id}`, {method: "DELETE", headers: getHeaders()});
                if(!result.ok) {
                    throw new Error(JSON.stringify(myErrorMessage(result.status, id)));
                }
            } catch(err){
                showError(err);
            }
        }
    };
})();