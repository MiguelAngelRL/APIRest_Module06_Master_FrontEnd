import { addCarRows, retrieveCarId, populateEditCarForm, retrieveCarForm, cleanTable, cleanCarForm } from './uiHelpers';
import { httpClientService } from './api/http-client.service';
import { login } from './api/login.service';

const readCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return {
        username,
        password
    };
};

const resetCredentialsForm = () => {
    document.getElementById('username').value="";
    document.getElementById('password').value="";
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const credentials = readCredentials();
        login(credentials)
            .then((data) => {
                if(!((typeof data === 'string') || (data instanceof String))) {
                    const { access_token } = data;
                    const headers = {
                        'Authorization': `Bearer ${access_token}`
                    };
                    httpClientService.setHeaders(headers);
                    alert("Las credenciales son correctas!!");
                } else {
                    alert("Las credenciales NO son correctas!!");
                }
                resetCredentialsForm();
            })
            .catch((err) => console.log(err));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttonLoadCars = document.getElementById('loadcars');
    buttonLoadCars.addEventListener('click', (event) => {
        event.stopPropagation();
        cleanTable('cars-table');
        httpClientService.getAllCars()
            .then((result) => { addCarRows(result, 'cars-table');})
            .catch((err)=>{});
    });

    const buttonLoadCar = document.getElementById('loadcar');
    buttonLoadCar.addEventListener('click', (event) => {
        event.stopPropagation();
        const carId = retrieveCarId();
        if(carId){
            httpClientService.getCarById(carId)
                .then((r) => populateEditCarForm(r))
                .catch((err)=>{});
        }
    });

    const buttonUpdateList = document.getElementById('update');
    buttonUpdateList.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        const car = retrieveCarForm();
        const carId = retrieveCarId();
        if(carId){
            httpClientService.modifyCar(car, carId)
                .then((_) => {
                    cleanTable('cars-table');
                    return httpClientService.getAllCars();
                })
                .then((result) => {
                    addCarRows(result, 'cars-table');
                })
                .catch((err)=>{});
        } else {
            httpClientService.addCar(car)
                .then((_) => {
                    cleanTable('cars-table');
                    cleanCarForm();
                    return httpClientService.getAllCars();
                })
                .then((result) => {
                    addCarRows(result, 'cars-table');
                })
                .catch((err)=>{});
        }    
    });

    const buttonDeleteItem = document.getElementById('delete');
    buttonDeleteItem.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        const carId = retrieveCarId();
        if(carId){
            httpClientService.deleteCar(carId)
                .then((_) => {
                    cleanTable('cars-table');
                    cleanCarForm();
                    return httpClientService.getAllCars();
                })
                .then((result) => {
                    addCarRows(result, 'cars-table');
                })
                .catch((err)=>{});
        }
    });
});