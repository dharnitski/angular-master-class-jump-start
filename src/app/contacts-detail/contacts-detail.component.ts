import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';


import { Store } from '@ngrx/store';
import { ApplicationState } from '../state/app.state';
import { SelectContactAction } from '../state/contacts/contacts.actions';
import { Observable } from 'rxjs/Observable';
import { ContactsQuery } from '../state/contacts/contacts.reducer';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.contact$ = this.store.select(ContactsQuery.getSelectedContact);
  }
}
