import React from "react";
import Editor from "../Components/Editor";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_NOTE, EDIT_NOTE } from "../queries";

export default (props) => {
	const {
		match: {
			params: { id },
		},
	} = props;

	const { loading, data } = useQuery(GET_NOTE, {
		variables: {
			id: parseInt(id),
		},
	});

	const [editNote] = useMutation(EDIT_NOTE);

	const _onSave = (title, content) => {
		const {
			history: { push },
		} = props;

		if (!data) return;
		else {
			const {
				note: { id },
			} = data;
			console.log(id, title, content);
			console.log(editNote);
			editNote({ variables: { id, title, content } });
			push("/");
		}
	};

	return <>{loading ? null : <Editor title={data.note.title} content={data.note.content} onSave={_onSave} />}</>;
};
