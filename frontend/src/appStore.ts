import type { Category, User } from '@prisma/client';
import { writable } from 'svelte/store';

const createUser = () => {
	const { subscribe, update, set } = writable<User>(
		JSON.parse(localStorage.getItem('activeUser')) || undefined
	);

	return {
		subscribe,
		login: (value) => {
			localStorage.setItem('activeUser', JSON.stringify(value));
			set(value);
		},
		logout: () => {
			localStorage.removeItem('activeUser');
			set(undefined);
		},
	};
};

/*
const createCats = () => {
	const { subscribe, update, set } = writable<Category[]>(
		JSON.parse(localStorage.getItem('categories')) || []
	);

	return {
		subscribe,
		load: (value) => {
			localStorage.setItem('categories', JSON.stringify(value));
			set(value);
		},
		empty: () => {
			localStorage.removeItem('categories');
			set(undefined);
		},
	};
};
*/

export const user = createUser();
//export const cats = createCats();
