// Empty array so the trips can be stored once they are created
const trips = [];

// The create funtion buddy
const createTrips = (destination, startDate, endDate) => {
    const trip =  new Trip(destination, startDate, endDate);
    trips.push(trip);
}