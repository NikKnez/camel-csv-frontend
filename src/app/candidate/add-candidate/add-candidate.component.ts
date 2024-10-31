import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from '../candidate.service';
import { Candidate } from '../candidate-model/candidate.model';

@Component({
    selector: 'app-add-candidate',
    templateUrl: './add-candidate.component.html',
})
export class AddCandidateComponent {
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

    emailError: string | null = null;
    jmbgError: string | null = null;

    constructor(private candidateService: CandidateService, private router: Router) {}

    validateEmail(email: string): boolean {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
      return emailPattern.test(email);
  }

  validateJMBG(jmbg: string): boolean {
      return /^\d{13}$/.test(jmbg); // Check if JMBG has exactly 13 digits
  }

    addCandidate() {
      this.emailError = null;
      this.jmbgError = null;

      const isEmailValid = this.validateEmail(this.candidate.email);
      const isJMBGValid = this.validateJMBG(this.candidate.jmbg);

      if (!isEmailValid) {
          this.emailError = 'Invalid email address.';
      }

      if (!isJMBGValid) {
          this.jmbgError = 'JMBG must contain exactly 13 digits.';
      }

      if (!isEmailValid || !isJMBGValid) {
          return;
      }

        this.candidateService.addCandidate(this.candidate).subscribe({
            next: (response) => {
                console.log('Candidate added:', response);
                this.router.navigate(['/candidates']);
            },
            error: (error) => {
                console.error('Error adding candidate:', error);
            }
        });
    }
}
