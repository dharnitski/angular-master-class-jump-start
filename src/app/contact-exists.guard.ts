import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ContactsService } from "./contacts.service";
import { SelectContactAction, AddContactAction } from "./state/contacts/contacts.actions";
import { ApplicationState } from "./state/app.state";
import { Contact } from "./models/contact";
import { map, take, switchMap, tap } from "rxjs/operators";
//import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ContactExistsGuard implements CanActivate {

  constructor(
    public store: Store<ApplicationState>,
    private contactsService: ContactsService) { }

  canActivate(route: ActivatedRouteSnapshot) {

    let contactId = route.paramMap.get('id');
    this.store.dispatch(new SelectContactAction(+contactId));

    const resolveOrAddContactToList = (loaded: boolean) => {

      let addContactToList = (contact: Contact) => {
        this.store.dispatch(new AddContactAction(contact))
      };

      // odes not work because this is not injected into anonimous function
      // let addContactToList = function(contact: Contact) {
      //   this.store.dispatch(new AddContactAction(contact))
      // };

      return loaded ? of(true) : this.contactsService
        .getContact(contactId).pipe(
        tap(addContactToList),
        map(contact => !!contact)
        );
    }

    return this.store.select(state => state.contacts.loaded)
      .pipe(
      take(1),
      switchMap(resolveOrAddContactToList)
      )
  }
}


