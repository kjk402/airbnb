import UserMenu from "./UserMenu";

import { EmptyInterface } from "./../../../../utils/interfaces";

interface IAppProps {}

export default function SideContainer({}: IAppProps) {
	return (
		<div>
			<UserMenu />
		</div>
	);
}
