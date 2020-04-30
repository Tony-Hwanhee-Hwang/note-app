import { GET_NOTES } from "./queries";

export const saveNotes = (cache) => {
	const { notes } = cache.readQuery({ query: GET_NOTES });

	try {
		const jsonNotes = JSON.stringify(notes);
		localStorage.setItem("notes", jsonNotes);
	} catch (error) {
		console.log(error);
	}
};

export const loadNotes = () => {
	try {
		const notes = localStorage.getItem("notes");
		const parsedNotes = JSON.parse(notes);
		return parsedNotes;
	} catch (error) {
		console.log(error);
		return [];
	}
};
