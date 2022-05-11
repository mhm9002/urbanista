import { createGlobalState } from 'react-hooks-global-state';

export interface IGlobalState {
	activePage: pages;
}

export enum pages {
	home,
	account,
	author,
	categories,
	post,
	profile,
}

const defaultGlobalState: IGlobalState = {
	activePage: pages.home,
};

export const { useGlobalState } =
	createGlobalState<IGlobalState>(defaultGlobalState);
