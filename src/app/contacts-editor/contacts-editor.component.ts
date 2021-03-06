import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { ApplicationState } from '../state/app.state';
import { SelectContactAction, UpdateContactAction } from '../state/contacts/contacts.actions';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { ContactsQuery } from '../state/contacts/contacts.reducer';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(private contactsService: ContactsService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.contact$ = this.store.select(ContactsQuery.getSelectedContact)
      .pipe(map(contact => ({ ...contact })));
  }


  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this.contactsService.updateContact(contact)
      .subscribe(() => {
        this.store.dispatch(new UpdateContactAction(contact));
        this.goToDetails(contact)
      });
  }

  private goToDetails(contact: Contact) {
    this.router.navigate(['/contact', contact.id]);
  }
}

