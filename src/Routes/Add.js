import React from "react";
import Editor from "../Components/Editor";
import { CREATE_NOTE } from "../queries";
import { useMutation } from "@apollo/react-hooks";

export default (props) => {
	const [createNote] = useMutation(CREATE_NOTE);

	const _onSave = (title, content) => {
		const {
			history: { push },
		} = props;
		createNote({ variables: { title, content } });
		push("/");
	};

	return (
		<>
			<Editor onSave={_onSave} />
		</>
	);
};
