
const addActivity = (trip, activity) => {
    trips.activities.push(activity);
}

const addActivityToTrip = (tripIndex, activity) => {
    if (tripIndex >= 0 && tripIndex < trips.length) {
        addActivity(trips[tripIndex], activity);
    } else {
        console.log("Trip index is invalid")
    }
}

addActivityToTrip(0, activityData.data)




//
// const activity = [];
// // Method to add an activity to the trip
// const addActivity = (activity) => {
//     this.activities.push(activity);
// }
//
// const addActivityToTrip = (tripIndex, activity) => {
//     if (tripIndex >= 0 && tripIndex < trips.length) {
//         trips[tripIndex].addActivity(activity);
//     } else {
//         console.log("Trip index is invalid")
//     }
// }
//
// addActivityToTrip(0, activityData.data)