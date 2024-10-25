import { Component } from '@angular/core';
import { CandidateService } from '../candidate.service';
import { Candidate } from '../candidate-model/candidate.model';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent {
  candidates: Candidate[] = [];
  jmbg: string = '';
  email: string = '';
  employedAfterCompetition: boolean = false;

  constructor(private candidateService: CandidateService) {}

  ngOnInit() {
    this.loadAllCandidates();
  }

  loadAllCandidates() {
    this.candidateService.getAllCandidates().subscribe((data: Candidate[]) => {
      this.candidates = data;
    });
  }

  deleteCandidate(id: number) {
    if (confirm('Are you sure you want to delete this candidate?')) {
      this.candidateService.delete(id).subscribe(() => {
        this.loadAllCandidates();
      }, error => {
        console.error('Error deleting candidate:', error);
      });
    }
  }

  searchCandidates() {
    let params: any = {};

    if (this.jmbg && this.jmbg.length === 13) {
      params.jmbg = this.jmbg;
    }

    if (this.email) {
      params.email = this.email;
    }

    params.employedAfterCompetition = this.employedAfterCompetition;

    this.candidateService.searchCandidates(this.jmbg, this.email, this.employedAfterCompetition).subscribe({
      next: (data: Candidate[]) => {
        this.candidates = data;
      },
      error: (error) => {
        console.error('Error searching candidates:', error);
      }
    });
  }

  downloadCsv() {
    this.candidateService.downloadCsv(this.jmbg, this.email, this.employedAfterCompetition).subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'candidates.csv';
      document.body.appendChild(a);
      a.target = '_blank';
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error downloading CSV:', error);
    });
  }
}
