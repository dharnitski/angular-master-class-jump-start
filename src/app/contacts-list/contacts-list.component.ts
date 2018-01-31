import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { ApplicationState } from '../state/app.state';
import { LoadContactsSuccessAction } from '../state/contacts/contacts.actions';


@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Array<Contact>>;

  constructor(
    private contactsService: ContactsService,
    private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.contacts$ = this.store.select(state => state.contacts.list)

    // the same
    // let query = (state) => state.contacts.list;
    // this.contacts$ = this.store.select(query);

    // this.contacts$ = this.store.select('contacts', 'list');

    this.contactsService
      .getContacts()
      .subscribe(contacts => {
        this.store.dispatch(
          new LoadContactsSuccessAction(contacts)
        );
      });
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
