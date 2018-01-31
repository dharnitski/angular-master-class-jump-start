import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { ApplicationState } from '../state/app.state';
import { SelectContactAction } from '../state/contacts/contacts.actions';
import { Observable } from 'rxjs/Observable';

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
    let contactId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new SelectContactAction(+contactId));

    this.contact$ = this.store.select(state => {
      let id = state.contacts.selectedContactId;
      let contact = state.contacts.list.find(contact =>
        contact.id == id);
      return Object.assign({}, contact);
    });
  }


  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this.contactsService.updateContact(contact)
      .subscribe(() => this.goToDetails(contact));
  }

  private goToDetails(contact: Contact) {
    this.router.navigate(['/contact', contact.id]);
  }
}

