import React from "react";

export interface EmptyInterface {}

export interface ModalInterface {
	filter: any;
	setFilter: any;
	type: string;
	setInplaceHolder: React.Dispatch<React.SetStateAction<string | undefined>>;
	className?: string;
	isActive: boolean;
	setModalOn: any;
}

export type ModalType = "location" | "calendar" | "fee" | "guest";
