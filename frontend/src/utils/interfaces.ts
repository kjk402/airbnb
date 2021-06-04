import React from "react";

export interface ModalInterface {
	filter: any;
	setFilter: any;
	type: string;
	setInplaceHolder: React.Dispatch<React.SetStateAction<string | undefined>>;
	className?: string;
	isActive: boolean;
	setModalOn: any;
}
