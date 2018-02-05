import { Contact } from '../../models/contact';

import { ContactsActionTypes, ContactsActions } from '../contacts/contacts.actions';
import { createSelector } from '@ngrx/store';
import { ApplicationState } from '../app.state';

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
                list: action.payload,
                loaded: true,
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

export namespace ContactsQuery {
    export const getContacts = (state: ApplicationState) => state.contacts.list;
    export const getLoaded = (state: ApplicationState) => state.contacts.loaded;
    export const getSelectedContactId = (state: ApplicationState) => state.contacts.selectedContactId;
    export const getSelectedContact = createSelector(getContacts, getSelectedContactId, (contacts, id) => {
        let contact = contacts.find(contact => contact.id == id);
        return contact ? Object.assign({}, contact) : undefined;
    })
}
