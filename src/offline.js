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
		let parsedNotes = JSON.parse(notes);

		//if notes not exists in localstorage, make default data
		if (!parsedNotes) parsedNotes = [{ id: 0, title: "", content: "", __typename: "Note" }];

		return parsedNotes;
	} catch (error) {
		console.log(error);
		return [];
	}
};
