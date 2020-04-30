import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_NOTE } from "../queries";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";

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

const Button = styled.button``;

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

	return (
		<>
			{loading ? null : (
				<>
					<TitleComponent>
						<Title>{data.note && data.note.title}</Title>
						<Link to={`/edit/${data.note.id}`}>
							<Button>Edit</Button>
						</Link>
					</TitleComponent>
					<MarkdownRenderer markdown={data.note.content} />
				</>
			)}
		</>
	);
};
