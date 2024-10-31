import { Component, OnInit } from '@angular/core';
import { Candidate } from '../candidate-model/candidate.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrl: './candidate-details.component.css'
})

export class CandidateDetailsComponent implements OnInit {

  candidate: Candidate | null = null;

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const candidateId = this.route.snapshot.paramMap.get('id');
    if (candidateId) {
      this.getCandidateDetails(+candidateId);
    }
  }

  getCandidateDetails(id: number): void {
    this.candidateService.get(id).subscribe((candidate) => {
      this.candidate = candidate;
    });
  }

  goBack(): void {
    this.router.navigate(['/candidates']);
  }
}
