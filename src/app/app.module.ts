import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CandidateListComponent } from './candidate/candidate-list/candidate-list.component';
import { AddCandidateComponent } from './candidate/add-candidate/add-candidate.component';
import { CandidateFormComponent } from './candidate/candidate-form/candidate-form.component';
import { CandidateDetailsComponent } from './candidate/candidate-details/candidate-details.component';
import { UpdateCandidateComponent } from './candidate/update-candidate/update-candidate.component';
import { DeleteCandidateComponent } from './candidate/delete-candidate/delete-candidate.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { CandidateService } from './candidate/candidate.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CandidateListComponent,
    CandidateFormComponent,
    AddCandidateComponent,
    CandidateDetailsComponent,
    UpdateCandidateComponent,
    DeleteCandidateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [CandidateService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
