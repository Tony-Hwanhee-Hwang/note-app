import { gql } from "apollo-boost";

export const NOTE_FRAGMENT = gql`
	fragment NoteParts on Note {
		id
		title
		content
	}
`;
