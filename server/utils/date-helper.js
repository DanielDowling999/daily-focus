/* Helper function to retrieve today's date */
function getTodaysDate() {
    const NZGmt = 13;
    let todaysDate = new Date();
    todaysDate.setHours(todaysDate.getHours() + NZGmt);
    todaysDate = todaysDate.toISOString().slice(0, 10);

    return todaysDate;
}

module.exports = getTodaysDate;
