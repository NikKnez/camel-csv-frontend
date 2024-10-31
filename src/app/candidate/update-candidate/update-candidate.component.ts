import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../candidate.service';
import { Candidate } from '../candidate-model/candidate.model';

@Component({
  selector: 'app-update-candidate',
  templateUrl: './update-candidate.component.html',
})
export class UpdateCandidateComponent implements OnInit {
  candidate: Candidate = {
    firstName: '',
    lastName: '',
    jmbg: '',
    yearOfBirth: new Date().getFullYear(),
    email: '',
    phone: '',
    notes: '',
    employedAfterCompetition: null,
    dataUpdate: new Date(),
  };
  id!: number;

  constructor(
    private candidateService: CandidateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCandidate();
  }

  isLoading = true;

  getCandidate(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.id = id;
    this.candidateService.get(id).subscribe({
      next: (candidate) => {
        this.candidate = candidate;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching candidate:', error);
        this.isLoading = false;
      }
    });
  }

  confirmUpdate(): void {
    if (window.confirm('Are you sure you want to update this candidate?')) {
      this.updateCandidate();
    }
  }

  updateCandidate(): void {
    this.candidate.dataUpdate = new Date();
    this.candidateService.update(this.id, this.candidate).subscribe({
      next: (response) => {
        console.log('Candidate updated:', response);
        this.router.navigate(['/candidates']);
      },
      error: (error) => {
        console.error('Error updating candidate:', error);
      }
    });
  }
}
