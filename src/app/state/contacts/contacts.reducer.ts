import { Contact } from '../../models/contact';

import {
    ContactsActionTypes,
    ContactsActions
} from '../contacts/contacts.actions';

export interface ContactsState {
    list: Contact[];
    selectedContactId: number;
    loaded: boolean;
}

const INITIAL_STATE: ContactsState = {
    list: [],
    selectedContactId: null,
    loaded: false,
}

export function contactsReducer(state: ContactsState = INITIAL_STATE, action: ContactsActions) {
    switch (action.type) {
        case ContactsActionTypes.LOAD_CONTACTS_SUCCESS:
            return {
                ...state,
                list: action.payload
            };
        case ContactsActionTypes.SELECT_CONTACT:
            return {
                ...state,
                selectedContactId: action.payload
            };
        case ContactsActionTypes.UPDATE_CONTACT:
            let updatedList = state.list.map(contact => {
                return contact.id == action.payload.id
                    ? { ...contact, ...action.payload }
                    : contact;
            });
        case ContactsActionTypes.ADD_CONTACT:
            let findInList = (found, contact) => {
                return found || contact.id == action.payload.id;
            };
            let inStore = state.list.find(findInList);

            return {
                ...state,
                list: !inStore ? [...state.list, action.payload] :
                    state.list
            };
        default:
            return state;
    }
}