import { gql } from "apollo-boost";

export const NOTE_FRAGMENT = gql`
	fragment NotePars on Note {
		id
		title
		content
	}
`;
