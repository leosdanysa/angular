import {Component, OnInit}  from "@angular/core";
import {Person}             from "../shared/model";
import {PersonService}      from "../shared/services/person.service";
//import {HomeComponent} from "./home.component";

@Component({
  selector: 'person-list',
  templateUrl: 'person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnInit{
  title = 'Persons';
  persons: Person[] = [];

  constructor(private personService: PersonService) {};

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(): void {
    //this.personService.getPersons().then(p => this.persons = p);
    this.personService.getPersons().subscribe(
      response => {
        this.persons = response;// as Person[];
      }
    );
  }
}
