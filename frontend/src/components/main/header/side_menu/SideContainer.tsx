import UserMenu from "./UserMenu";

import { EmptyInterface } from "./../../../../utils/interfaces";

interface IAppProps {
	isMini: boolean;
}

export default function SideContainer({ isMini }: IAppProps) {
	return (
		<div>
			<UserMenu isMini={isMini} />
		</div>
	);
}
