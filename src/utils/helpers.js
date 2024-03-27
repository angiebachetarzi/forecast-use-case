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

const isValidDateFormat = (dateString) => {
    //regular expression to match 'YYYY-MM-DD' format
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}

module.exports = {
    isURLSafe,
    isValidLongitude,
    isValidLatitude,
    isValidDateFormat
}