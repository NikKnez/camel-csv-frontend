import { Component } from '@angular/core';
import { CandidateService } from '../candidate.service';
import { Candidate } from '../candidate-model/candidate.model';

@Component({
  selector: 'app-search-candidate',
  templateUrl: './search-candidate.component.html',
  styleUrls: ['./search-candidate.component.css']
})
export class SearchCandidateComponent {
  jmbg: string = '';
  email: string = '';
  employedAfterCompetition: boolean = false;
  candidates: Candidate[] = [];

  constructor(private candidateService: CandidateService) {}

  searchCandidates() {
    this.candidateService.searchCandidates(this.jmbg, this.email, this.employedAfterCompetition).subscribe(data => {
      this.candidates = data;
      console.log('Candidates found:', this.candidates);
    });
  }
}
