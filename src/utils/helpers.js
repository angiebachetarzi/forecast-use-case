//helper functions

const isURLSafe = (value) => {
    //encode the value
    const encodedValue = encodeURIComponent(value);
    //check if the encoded value is the same as the original value
    //if they are the same, it means the value is URL safe
    return encodedValue === value;
}
const isValidLongitude = (longitude) => {
    return typeof longitude === 'number' && longitude >= -180 && longitude <= 180;
}

const isValidLatitude = (latitude) => {
    return typeof latitude === 'number' && latitude >= -90 && latitude <= 90;
}
module.exports = {
    isURLSafe,
    isValidLongitude,
    isValidLatitude
}