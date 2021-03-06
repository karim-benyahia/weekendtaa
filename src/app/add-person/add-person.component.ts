import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person';
import { PersonService } from '../service/person-services/person.service';
import { Sport } from '../model/sport';
import { SportService } from '../service/sport-service/sport.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Place } from '../model/place';
import { PlaceService } from '../place.service';
import { ChoiceService } from '../service/choice-service/choice.service';
import { Choice } from '../model/choice';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  persons: Person[] = [];
  newPerson: Person = new Person();
  sportList: Sport[];
  placesList: Place[];
  personForm: FormGroup;

  constructor(
    private personService: PersonService,
    private sportService: SportService,
    private placeService: PlaceService,
    private choiceService: ChoiceService,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    this.initForm();
    this.sportList = await this.sportService.getSports().toPromise();
    this.placesList = await this.placeService.getPlaces().toPromise();


    console.log(this.placesList);
  }

  initForm() {
    this.personForm = this.fb.group({
      person: this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: '',
        image: '',
      }),
      sport: '',
      level: '',
      places: []
    })
  }

  addPerson() {
    this.personService.addPerson(this.personForm.value.person)
      .subscribe(person => {
        console.log("newPersonId", person.id);
        if (person.id == null) {
          return;
        }
        else {
          console.log("Choice");
          let choice = new Choice();
          this.personForm.value.person = person;
          this.personForm.value.level = { id: this.personForm.value.level };
          this.personForm.value.sport = { id: this.personForm.value.sport };
          const places = this.personForm.value.places.map(item => Object.assign({ id: item }));
          this.personForm.value.places = places;
          choice = this.personForm.value;
          this.choiceService.addChoice(choice)
            .subscribe(data => {
              console.log("new Choice", data);
              this.initForm();

            })
        }


      });

  }
}
