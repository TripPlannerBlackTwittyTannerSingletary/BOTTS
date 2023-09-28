const searchActivity = (activities, minPrice, maxPrice, activityType) => {
    return activities.filter(activity => {
        const priceInRange = activity.price >= minPrice && activity.price <= maxPrice;
        const typeMatches = !activityType || activityType === activityType;

        return priceInRange && typeMatches;
    })
}