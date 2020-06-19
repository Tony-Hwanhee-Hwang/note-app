import gql from "graphql-tag";
import { NOTE_FRAGMENT } from "./fragments";

export const GET_NOTES = gql`
	{
		notes @client {
			...NoteParts
		}
	}
	${NOTE_FRAGMENT}
`;

export const GET_NOTE = gql`
	query getNote($id: Int!) {
		note(id: $id) @client {
			...NoteParts
		}
	}
	${NOTE_FRAGMENT}
`;

export const CREATE_NOTE = gql`
	mutation createNote($title: String!, $content: String) {
		createNote(title: $title, content: $content) @client {
			id
		}
	}
`;

export const EDIT_NOTE = gql`
	mutation editNote($id: Int!, $title: String!, $content: Stirng) {
		editNote(id: $id, title: $title, content: $content) @client {
			id
		}
	}
`;

export const DELETE_NOTE = gql`
	mutation deleteNote($id: Int!) {
		deleteNote(id: $id) @client
	}
`;
