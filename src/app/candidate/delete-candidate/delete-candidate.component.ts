import { Component } from '@angular/core';
import { CandidateService } from '../candidate.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-candidate',
  templateUrl: './delete-candidate.component.html',
  styleUrls: ['./delete-candidate.component.css']
})
export class DeleteCandidateComponent {
  id!: number;

  constructor(
    private candidateService: CandidateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.confirmDelete();
  }

  confirmDelete() {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      this.deleteCandidate();
    } else {
      this.router.navigate(['/candidates']);
    }
  }

  deleteCandidate() {
    this.candidateService.delete(this.id).subscribe(() => {
      console.log('Candidate deleted successfully');
      this.router.navigate(['/candidates']);
    });
  }
}
