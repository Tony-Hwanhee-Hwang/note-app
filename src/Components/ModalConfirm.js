import React from "react";
import styled from "styled-components";

const Background = styled.div`
	display: ${(props) => (props.visible ? "block" : "none")};
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.6);
`;

const Dialog = styled.div`
	position: relative;
	width: 50%;
	background-color: white;
	border-radius: 10px;
	margin: 30px auto;
	opacity: 1;
	transition: opacity 3s ease-out;
`;

const DlgHeader = styled.div`
	color: black;
	font-weight: 500;
	font-size: 19px;
	margin: 0;
	padding: 16px 24px;
`;
const DlgContent = styled.div`
	padding: 8px 24px;
	overflow-y: auto;
`;
const DlgFooter = styled.div`
	flex: 0 0 auto;
	display: flex;
	padding: 8px;
	align-items: center;
	justify-content: flex-end;
`;

const CloseBtn = styled.a`
	position: absolute;
	right: 36px;
	top: 8px;
	opacity: 0.3;
	:hover {
		opacity: 1;
		cursor: pointer;
	}
	:before,
	:after {
		position: absolute;
		left: 15px;
		content: " ";
		height: 24px;
		width: 2px;
		background-color: #333;
	}
	:before {
		transform: rotate(45deg);
	}
	:after {
		transform: rotate(-45deg);
	}
`;

const Button = styled.button`
	display: inherit;
	align-items: inherit;
	justify-content: inherit;
	border: 0;
	color: #1976d2;
	padding: 6px 8px;
	border-radius: 4px;
	:hover {
		background-color: rgba(25, 118, 210, 0.04);
	}
`;

const ModalAlert = ({ visible, xButton, onClose, headerContent, children, onConfirm }) => {
	const _close = (e) => {
		if (onClose) {
			onClose(e);
		}
	};

	const _handleConfirm = (e) => {
		if (onConfirm) {
			onConfirm(true);
		}
	};

	return (
		<Background visible={visible}>
			<Dialog>
				<DlgHeader>{headerContent}</DlgHeader>
				{xButton && <CloseBtn onClick={_close} />}
				<DlgContent>{children}</DlgContent>
				<DlgFooter>
					<Button onClick={_handleConfirm}>Confirm</Button>
					<Button onClick={_close}>Cancel</Button>
				</DlgFooter>
			</Dialog>
		</Background>
	);
};

ModalAlert.defaultProps = {
	xButton: false,
	visible: true,
};
export default ModalAlert;
