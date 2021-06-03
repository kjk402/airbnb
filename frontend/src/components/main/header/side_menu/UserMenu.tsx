import styled from "styled-components";
import { ReactComponent as MenuIcon } from "./../../../../icons/menu.svg";
import { ReactComponent as UserIcon } from "./../../../../icons/user.svg";
import { EmptyInterface } from "./../../../../utils/interfaces";

interface IAppProps {
	isMini: boolean;
}

export default function UserMenu({ isMini }: IAppProps) {
	return (
		<>
			<StyleUserMenu isMini={isMini}>
				<UserButton>
					<MenuIcon className="menu_icon" width="24" height="24" />
					<UserIcon className="user_icon" stroke="#ffffff" width="28" height="28" />
				</UserButton>
			</StyleUserMenu>
		</>
	);
}

const StyleUserMenu = styled.div<{ isMini: boolean }>`
	position: relative;
	display: flex;
	justify-content: flex-end;
	top: ${(props) => (props.isMini ? "0px" : "-48px")};
`;

const UserButton = styled.button`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	width: 76px;
	height: 40px;
	border-radius: 25px;
	border: 1px solid #bdbdbd;
	background-color: white;
	.menu_icon {
		padding: 2px;
	}
	.user_icon {
		padding: 5px;
		border-radius: 25px;
		background-color: #828282;
	}
`;
