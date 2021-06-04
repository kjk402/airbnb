import styled from "styled-components";
import { ReactComponent as LogoImg } from "./../../../icons/logo.svg";
import { Link } from "react-router-dom";

export default function Logo({}: {}) {
	return (
		<>
			<LOGO>
				<Link to="/">
					<LogoImg />
				</Link>
			</LOGO>
		</>
	);
}

const LOGO = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	width: 88px;
	height: 46px;
`;
