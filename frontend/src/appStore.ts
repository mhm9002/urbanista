import type { User } from '@prisma/client';
import SecureLS from 'secure-ls';
import { writable } from 'svelte/store';

let store = new SecureLS({
	encodingType: 'aes',
	isCompression: true,
	encryptionSecret: 'halawallah',
});

try {
	store.get('activeUser');
} catch (e) {
	store.set('activeUser', undefined);
	store.set('token', '');
}

const createUser = () => {
	const { subscribe, update, set } = writable<User>(
		store.get('activeUser') || undefined
	);

	return {
		subscribe,
		login: (value) => {
			store.set('activeUser', value);
			set(value);
		},
		logout: () => {
			store.set('activeUser', undefined);
			set(undefined);
		},
	};
};

const createToken = () => {
	const { subscribe, update, set } = writable<string>(
		store.get('token') || undefined
	);

	return {
		subscribe,
		saveToken: (value) => {
			store.set('token', value);
			set(value);
		},
		removeToken: () => {
			store.set('token', '');
			set(undefined);
		},
		get: () => {
			return store.get('token') || undefined;
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
export const token = createToken();
export const showComments = writable(false);
//export const cats = createCats();
