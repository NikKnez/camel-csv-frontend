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
    employedAfterCompetition: false,
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

  getCandidate(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.candidateService.get(id).subscribe({
      next: (candidate) => {
        this.candidate = candidate; // Assign the fetched candidate data to the candidate object
      },
      error: (error) => {
        console.error('Error fetching candidate:', error);
      }
    });
  }

  updateCandidate(): void {
    this.candidateService.update(this.id, this.candidate).subscribe({
      next: (response) => {
        console.log('Candidate updated:', response);
        this.router.navigate(['/candidates']); // Redirect after successful update
      },
      error: (error) => {
        console.error('Error updating candidate:', error);
      }
    });
  }
}
