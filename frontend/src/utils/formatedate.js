function formatDate(timestamp) {
    // Convert the timestamp string to a Date object
    const date = new Date(timestamp);
    
    // Define month names
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    
    // Extract date components
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');

    // Construct the formatted date string
    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
}

export default formatDate 
