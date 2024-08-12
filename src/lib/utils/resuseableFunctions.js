import { get } from "react-hook-form";



function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth(); 
    const year = date.getFullYear();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return `${monthNames[month]} ${day}, ${year}`;
}

function getNameFromEmail(email) {
    const username = email.split('@')[0];
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
    return capitalizedUsername;
}



function getColorFromId(id) {
    function hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    }

    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFF5", "#FF8C33", "#8CFF33", "#338CFF", "#FF338C"
    ];

    const hash = hashString(id);
    const colorIndex = Math.abs(hash) % colors.length;

    return colors[colorIndex];
}




export { formatDate, getNameFromEmail, getColorFromId };