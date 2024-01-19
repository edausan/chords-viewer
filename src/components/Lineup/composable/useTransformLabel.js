export const transformLabel = (label) => {
	if (label.includes("Solemn")) {
		return label.split("Solemn").join("Worship");
	}

	if (label.includes("Joyful")) {
		return label.split("Joyful").join("Praise");
	}

	return label;
};