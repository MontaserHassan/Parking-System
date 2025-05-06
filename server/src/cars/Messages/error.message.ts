/* eslint-disable prettier/prettier */
enum ErrorCarMessage {
    NOT_CREATED = 'Car not created',
    NOT_UPDATED = 'Car not updated',
    NOT_DELETED = 'Car not deleted',
    NOT_FOUND = 'Car not found',
    ALREADY_EXISTS = 'Car already exists',
    LICENSE_PLATE_ALREADY_EXISTS = 'This license plate already exists',
    PARKING_PLACE_IS_OCCUPIED = 'Parking place is occupied',
    PARKING_PLACE_IS_FULL = 'Parking doesn\'t have available places',
    PARKING_PLACE_NOT_FOUND = 'This place not found inside our parking',
    PARKING_PLACE_NOT_UPDATED = 'Parking place not updated due to Not found or Occupied',
    CAR_NOT_FOUND = 'Car not found inside our parking',
};



export default ErrorCarMessage;