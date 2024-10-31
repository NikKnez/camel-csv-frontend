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
  searchType: string = '';
  jmbg: string = '';
  email: string = '';
  employedAfterCompetition: boolean = false;
  employmentStatus: string = '';
  isSearchPerformed: boolean = false;
  expandedCandidateId: number | null = null;
  errorMessage: string | null = null;
  showAllCandidates: boolean = false;

  constructor(private candidateService: CandidateService) {}

  ngOnInit() {
    this.loadAllCandidates();
  }

  loadAllCandidates() {
    this.candidateService.getAllCandidates().subscribe((data: Candidate[]) => {
      this.candidates = data;
    });
  }

  toggleCandidateList() {
    this.showAllCandidates = !this.showAllCandidates;
    if (this.showAllCandidates) {
      this.loadAllCandidates();
    } else {
      this.candidates = [];
    }
  }

  toggleDetails(candidateId: number | undefined) {
    if (candidateId !== undefined) {
      this.expandedCandidateId = this.expandedCandidateId === candidateId ? null : candidateId;
    }
  }

  resetSearch() {
    this.jmbg = '';
    this.email = '';
    this.employmentStatus = '';
    this.employedAfterCompetition == undefined;
    this.isSearchPerformed = false;
    this.candidates = [];
    this.loadAllCandidates();
  }

  resetButton() {
    this.searchType = '';
    this.isSearchPerformed = false;
    this.candidates = [];
    this.errorMessage = null;
    this.showAllCandidates = false;
    this.loadAllCandidates();
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
    const params: any = {};

    if (!this.searchType) {
      this.errorMessage = "You must choose search criteria";
      this.isSearchPerformed = false;
      this.candidates = [];
      this.loadAllCandidates();
      return;
    } else {
      this.errorMessage = null;
    }

    if (this.searchType === 'jmbg' && (!this.jmbg || this.jmbg.length !== 13)) {
      this.errorMessage = 'You must enter a valid 13-digit JMBG.';
      this.isSearchPerformed = false;
      return;
    }

    if (this.searchType === 'email' && !this.validateEmail(this.email)) {
      this.errorMessage = 'You must enter a valid email address.';
      this.isSearchPerformed = false;
      return;
    }

    if (this.searchType === 'employmentStatus' && !this.employmentStatus) {
      this.errorMessage = 'You must choose Yes or No.';
      this.isSearchPerformed = false;
      return;
    }


    if (this.jmbg && this.jmbg.length === 13) {
      params.jmbg = this.jmbg;
    } else if (this.email) {
      params.email = this.email;
    } else if (this.employmentStatus) {
      params.employedAfterCompetition = this.employmentStatus === 'yes';
    }


    this.candidateService.searchCandidates(params).subscribe({
      next: (data: Candidate[]) => {
        this.candidates = data;
        this.isSearchPerformed = true;
      },
      error: (error) => {
        console.error('Error searching candidates:', error);
      }
    });
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  downloadAllCandidates() {
    this.candidateService.downloadAllCandidatesCsv().subscribe((response: Blob) => {
      this.saveCsvFile(response, 'all_candidates.csv');
    }, error => {
      console.error('Error downloading CSV:', error);
    });
  }

  downloadFilteredCandidates() {
    this.candidateService.downloadFilteredCsv(this.jmbg, this.email, this.employmentStatus).subscribe((response: Blob) => {
      this.saveCsvFile(response, 'filtered_candidates.csv');
    }, error => {
      console.error('Error downloading filtered CSV:', error);
    });
  }

  hasSearchCriteria(): boolean {
    return !!(this.jmbg || this.email || this.employmentStatus);
  }

  saveCsvFile(response: Blob, fileName: string) {
    const url = window.URL.createObjectURL(response);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

}
