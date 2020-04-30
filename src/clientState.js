import { NOTE_FRAGMENT } from "./fragments";
import { GET_NOTES } from "./queries";

export const defaults = {
	notes: [
		{
			__typename: "Note",
			id: 1,
			title: "Sample",
			content: "This is Sample content for testing",
		},
	],
};
export const typeDefs = [
	`
        schema{
            query: Query
            mutation: Mutation
        }
        type Query{
            notes: [Note]!
            note(id: Int!): Note
        }
        type Mutation{
            createNote(title: String!, content: String):Note!
            editNote(id: Int!, title: String!, content: String):Note!
        }
        type Note{
            id: Int!
            title: String!
            content: String!
        }
    `,
];
export const resolvers = {
	Query: {
		note: (_, variables, { getCacheKey, client }) => {
			const id = getCacheKey({ id: variables.id, __typename: "Note" });
			const note = client.readFragment({ fragment: NOTE_FRAGMENT, id });
			return note;
		},
	},
	Mutation: {
		createNote: (_, variables, { cache }) => {
			const { notes } = cache.readQuery({ query: GET_NOTES });
			const { title, content } = variables;
			const newNote = {
				__typename: "Note",
				title,
				content,
				id: notes.length + 1,
			};
			cache.writeData({
				data: {
					notes: [newNote, ...notes],
				},
			});
			return newNote;
		},
		editNote: (_, { id, title, content }, { cache, getCacheKey }) => {
			const key = getCacheKey({ id, __typename: "Note" });
			const data = cache.readFragment({ id: key, fragment: NOTE_FRAGMENT });
			const updateData = { ...data, title, content };
			cache.writeFragment({
				id: key,
				fragment: NOTE_FRAGMENT,
				data: updateData,
			});
			return updateData;
		},
	},
};
