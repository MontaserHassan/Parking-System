/* eslint-disable prettier/prettier */
enum ErrorParkingPlaceMessage {
    NOT_CREATED = 'Parking Place not created',
    NOT_UPDATED = 'Parking Place not updated',
    NOT_DELETED = 'Parking Place not deleted due to not existing or already Occupied',
    NOT_FOUND = 'Parking Place not found',
    ALREADY_EXISTS = 'Parking Place already exists',
    PLACES_ALREADY_EXIST = 'Some parking places already exist',
    PLACE_ALREADY_EXIST = 'Place Number already exists on this floor',
};



export default ErrorParkingPlaceMessage;