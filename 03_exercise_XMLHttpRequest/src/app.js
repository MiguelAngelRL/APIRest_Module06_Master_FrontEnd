import { 
    addCarRows, 
    retrieveCarId, 
    populateEditCarForm,
    retrieveCarForm,
    cleanTable,
    cleanCarForm
} from './uiHelpers';
import { 
   getAllCars,
   getCarById,
   addCar,
   modifyCar,
   deleteCar
} from './API/carsApi';

document.addEventListener('DOMContentLoaded', () => {
    const buttonLoadCars = document.getElementById('loadcars');
    buttonLoadCars.addEventListener('click', (event) => {
        event.stopPropagation();
        cleanTable('cars-table');
        getAllCars().then((result) => {
            addCarRows(result, 'cars-table');
        });
    });

    const buttonLoadCar = document.getElementById('loadcar');
    buttonLoadCar.addEventListener('click', (event) => {
        event.stopPropagation();
        const carId = retrieveCarId();
        if(carId){
            getCarById(carId)
                .then((r) => populateEditCarForm(r));
        }
    });

    const buttonUpdateList = document.getElementById('update');

    buttonUpdateList.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        const car = retrieveCarForm();
        const carId = retrieveCarId();
        if(carId){
            modifyCar(car, carId)
                .then((_) => {
                    cleanTable('cars-table');
                    return getAllCars();
                })
                .then((result) => {
                    addCarRows(result, 'cars-table');
                });
        } else {
            addCar(car)
                .then((_) => {
                    cleanTable('cars-table');
                    cleanCarForm();
                    return getAllCars();
                })
                .then((result) => {
                    addCarRows(result, 'cars-table');
                });
        }    
    });

    const buttonDeleteItem = document.getElementById('delete');

    buttonDeleteItem.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        const carId = retrieveCarId();
        if(carId){
            deleteCar(carId)
                .then((_) => {
                    cleanTable('cars-table');
                    cleanCarForm();
                    return getAllCars();
                })
                .then((result) => {
                    addCarRows(result, 'cars-table');
                });
        }
    });


});