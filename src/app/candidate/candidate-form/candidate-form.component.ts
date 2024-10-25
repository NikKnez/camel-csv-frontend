import { Component } from '@angular/core';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent {
  candidate = {
    firstName: '',
    lastName: '',
    jmbg: ''
  };

  saveCandidate() {
    console.log('Candidate saved:', this.candidate);
  }
}
