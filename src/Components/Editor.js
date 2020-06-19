import React, { useState } from "react";
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";
import TextareaAutosize from "react-textarea-autosize";

const TitleInput = styled(TextareaAutosize)`
	font-size: 50px;
	font-weight: 600;
	width: 100%;
	&::placeholder {
		font-weight: 600;
	}
`;

const ContentPreview = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 50px;
`;

const ContentInput = styled(TextareaAutosize)`
	font-size: 18px;
	margin-top: 15px;
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 50px;
`;

const Button = styled.button``;

export default ({ title, content, onSave }) => {
	const [note_title, setTitle] = useState(title ? title : "");
	const [note_content, setContent] = useState(content ? content : "");

	const _onSave = () => {
		onSave(note_title, note_content);
	};

	return (
		<>
			<TitleContainer>
				<TitleInput value={note_title} onChange={(e) => setTitle(e.target.value)} placeholder={"Untitled..."} name={"title"} />
				<Button onClick={_onSave}>Save</Button>
			</TitleContainer>
			<ContentPreview>
				<ContentInput value={note_content} onChange={(e) => setContent(e.target.value)} placeholder={"# This supports markdown!"} name={"content"} />
				<MarkdownRenderer markdown={note_content} className={"markdown"} />
			</ContentPreview>
		</>
	);
};
