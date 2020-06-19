import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_NOTE, DELETE_NOTE } from "../queries";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";
import ModalConfirm from "../Components/ModalConfirm";

const TitleComponent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 50px;
`;

const Title = styled.h1`
	font-size: 50px;
	margin: 0;
	padding: 0;
`;

const EditBtn = styled.button``;

const DeleteBtn = styled.button`
	color: red;
	border-color: red;
	margin-left: 5px;
`;

export default (props) => {
	const {
		history: { push },
		match: {
			params: { id },
		},
	} = props;
	const { loading, data } = useQuery(GET_NOTE, {
		variables: {
			id: parseInt(id),
		},
	});

	const [deleteNote] = useMutation(DELETE_NOTE);

	const _onClick = async () => {
		const result = await deleteNote({ variables: { id } });
		if (result.data.deleteNote) push("/");
	};

	const [showDialog, setShowDialog] = useState(false);
	const openDialog = () => {
		setShowDialog(true);
	};

	const closeDialog = () => {
		setShowDialog(false);
	};

	const handelConfirm = (confirm) => {
		if (confirm) {
			_onClick();
		}
		setShowDialog(false);
	};

	return (
		<>
			{loading ? null : (
				<>
					<TitleComponent>
						<Title>{data.note && data.note.title}</Title>
						<div>
							<Link to={`/edit/${data.note.id}`}>
								<EditBtn>Edit</EditBtn>
							</Link>
							<DeleteBtn onClick={openDialog}> Delete </DeleteBtn>
							{showDialog && (
								<ModalConfirm visible={showDialog} xButton={true} headerContent='Delete Note' onClose={closeDialog} onConfirm={handelConfirm}>
									Are you sure?
								</ModalConfirm>
							)}
						</div>
					</TitleComponent>
					<MarkdownRenderer markdown={data.note.content} />
				</>
			)}
		</>
	);
};
