import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateListComponent } from './candidate/candidate-list/candidate-list.component';
import { AddCandidateComponent } from './candidate/add-candidate/add-candidate.component';
import { CandidateDetailsComponent } from './candidate/candidate-details/candidate-details.component';
import { UpdateCandidateComponent } from './candidate/update-candidate/update-candidate.component';
import { DeleteCandidateComponent } from './candidate/delete-candidate/delete-candidate.component';

const routes: Routes = [
  { path: 'candidates', component: CandidateListComponent },
  { path: 'add', component: AddCandidateComponent },
  { path: 'candidates/details/:id', component: CandidateDetailsComponent },
  { path: 'candidates/update/:id', component: UpdateCandidateComponent },
  { path: 'candidates/delete/:id', component: DeleteCandidateComponent },
  { path: '', redirectTo: 'candidates', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
