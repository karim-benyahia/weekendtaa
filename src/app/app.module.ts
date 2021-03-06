import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppComponent } from './app.component';
import { SportsComponent } from './sports/sports.component';
import { SportDetailComponent } from './sport-detail/sport-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { from } from 'rxjs';
import { SportService } from './service/sport-service/sport.service';
import { HttpRequestIntercept } from './httpRequestInterceptor';
import { ChoiceComponent } from './choice/choice.component';
import { PersonsComponent } from './persons/persons.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { ChoiceService } from './service/choice-service/choice.service';
import { PersonService } from './service/person-services/person.service';
import { DetailChoiceComponent } from './detail-choice/detail-choice.component';
import { AddChoiceComponent } from './add-choice/add-choice.component';
import { PlaceComponent } from './place/place.component';
import { PlaceService } from './place.service';



@NgModule({
  declarations: [
    AppComponent,
    SportsComponent,
    SportDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PersonsComponent,
    AddPersonComponent,
    PersonDetailComponent,
    ChoiceComponent,
    DetailChoiceComponent,
    AddChoiceComponent,
    PlaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [SportService, PersonService, ChoiceService, PlaceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestIntercept,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
