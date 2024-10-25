import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateListComponent } from './candidate/candidate-list/candidate-list.component';
import { AddCandidateComponent } from './candidate/add-candidate/add-candidate.component';
import { UpdateCandidateComponent } from './candidate/update-candidate/update-candidate.component';
import { DeleteCandidateComponent } from './candidate/delete-candidate/delete-candidate.component';
import { SearchCandidateComponent } from './candidate/search-candidate/search-candidate.component';

const routes: Routes = [
  { path: 'candidates', component: CandidateListComponent },
  { path: 'add', component: AddCandidateComponent },
  { path: 'update/:id', component: UpdateCandidateComponent },
  { path: 'delete/:id', component: DeleteCandidateComponent },
  { path: 'search', component: SearchCandidateComponent },
  { path: '', redirectTo: 'candidates', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
