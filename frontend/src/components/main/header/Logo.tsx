import styled from "styled-components";
import { ReactComponent as LogoImg } from "./../../../icons/logo.svg";
import { EmptyInterface } from "./../../../utils/interfaces";
import { Link } from "react-router-dom";

interface IAppProps {
	isMini: boolean;
}

export default function Logo({ isMini }: IAppProps) {
	return (
		<>
			<LOGO isMini={isMini}>
				<Link to="/">
					<LogoImg />
				</Link>
			</LOGO>
		</>
	);
}

const LOGO = styled.div<{ isMini: boolean }>`
	position: relative;
	display: flex;
	align-items: center;
	width: 88px;
	height: 46px;
	top: ${(props) => (props.isMini ? "0" : "-48px")};
`;
