const activities = [];
const addActivity = (trip, activity) => {
    trip.activities.push(activity);
}

const addActivityToTrip = (tripIndex, activity) => {
    if (tripIndex >= 0 && tripIndex < trips.length) {
        addActivity(trips[tripIndex], activity);
    } else {
        console.log("Trip index is invalid")
    }
}

addActivityToTrip(0, activityData.data)

