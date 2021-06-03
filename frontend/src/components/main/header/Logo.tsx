import { ReactComponent as LogoImg } from "./../../../icons/logo.svg";
import { EmptyInterface } from "./../../../utils/interfaces";
import { Link } from "react-router-dom";

export default function Logo(props: EmptyInterface) {
	return (
		<>
			<Link to="/">
				<LogoImg />
			</Link>
		</>
	);
}
