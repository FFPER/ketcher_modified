import { pick } from 'lodash/fp';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { logger } from 'redux-logger';

import { formsState, formReducer } from './form';
import { optionsState, optionsReducer } from './options';
import { initTmplState, templatesReducer } from './templates';

import action from './action';
import toolbar from './toolbar';

function modal(state = null, action) {
	let { type, data } = action;

	if (type === 'UPDATE_FORM') {
		let formState = formReducer(state.form, action, state.name);
		return { ...state, form: formState }
	}

	switch (type) {
	case 'MODAL_CLOSE':
		return null;
	case 'MODAL_OPEN':
		return {
			name: data.name,
			form: formsState[data.name] || null
		}
	}
	return state;
}

const shared = combineReducers({
	actionState: action,
	toolbar,
	modal,
	options: optionsReducer,
	templates: templatesReducer
});

export function onAction(action) {
	if (action && action.dialog)
		return {
			type: 'MODAL_OPEN',
			data: { name: action.dialog }
		};
	return {
		type: 'ACTION',
		action
	};
}

function root(state, action) {
	switch (action.type) {
	case 'INIT':
		global._ui_editor = action.editor;
	case 'UPDATE':
		let {type, ...data} = action;
		if (data)
			state = { ...state, ...data };
	}

	let sh = shared(state, {
		...action,
		...pick(['editor', 'server'], state)
	});
	return (sh === state.shared) ? state : {
		...state, ...sh
	};
}

export default function(options, server) {
	// TODO: redux localStorage here
	var initState = {
		actionState: null,
		options: Object.assign(options, optionsState),
		server: server || Promise.reject("Standalone mode!"),
		editor: null,
		modal: null,
		templates: initTmplState
	};

	const middleware = [ thunk ];
	if (process.env.NODE_ENV !== 'production')
		middleware.push(logger);

	return createStore(root, initState, applyMiddleware(...middleware));
};
