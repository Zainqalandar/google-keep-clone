function formatDate(dateString) {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	return `${monthNames[month]} ${day}, ${year}`;
}

function getNameFromEmail(email) {
    if(email){
        const username = email.split('@')[0];
        const capitalizedUsername =
            username.charAt(0).toUpperCase() + username.slice(1);
        return capitalizedUsername;
    }
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
		'#FF5733',
		'#33FF57',
		'#3357FF',
		'#FF33A1',
		'#A133FF',
		'#33FFF5',
		'#FF8C33',
		'#8CFF33',
		'#338CFF',
		'#FF338C',
	];

	const hash = hashString(id);
	const colorIndex = Math.abs(hash) % colors.length;

	return colors[colorIndex];
}

function getTimeSinceCreation(blogDate) {
	const currentDate = new Date();
	const blogPostDate = new Date(blogDate);
	const timeDifference = currentDate - blogPostDate;

	if (timeDifference <= 24 * 60 * 60 * 1000) {
		const hours = Math.floor(timeDifference / (1000 * 60 * 60));
		const minutes = Math.floor(
			(timeDifference % (1000 * 60 * 60)) / (1000 * 60)
		);

		// Return a special case for "a few minutes ago" if minutes are 0
		return {
			isNew: true,
			timeString:
				hours > 0
					? `${hours}h ${minutes}m ago`
					: minutes > 0
					? `${minutes}m ago`
					: 'a few minutes ago',
		};
	}

	return { isNew: false };
}

export { formatDate, getNameFromEmail, getColorFromId, getTimeSinceCreation };
