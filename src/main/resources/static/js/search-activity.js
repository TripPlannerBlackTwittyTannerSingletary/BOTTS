// Search function for activity by price range and type
const searchActivityByPriceAndType = (activities, minPrice, maxPrice, activityType) => {
    return activities.filter(activity => {
        const priceInRange = activity.price >= minPrice && activity.price <= maxPrice;
        const typeMatches = activityType.toLowerCase() === activity.type.toLowerCase();

        return priceInRange && typeMatches;
    })
}

// Search function for activity by location
const searchActivityByLocation = (activities, searchLocation) => {
    return activities.filter(activity => {
        return activity.location.toLowerCase().includes(searchLocation.toLowerCase());
    })
}