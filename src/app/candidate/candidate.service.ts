import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Candidate } from '../candidate/candidate-model/candidate.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'http://localhost:8080/api/candidates';
  private candidatesSubject = new BehaviorSubject<Candidate[]>([]);
  candidates$ = this.candidatesSubject.asObservable();

  constructor(private http: HttpClient) {}


  addCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.apiUrl, candidate);
  }

  getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.apiUrl);
  }

  loadAllCandidates() {
    this.getAllCandidates().subscribe(candidates => {
      this.candidatesSubject.next(candidates);
    });
  }

  get(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiUrl}/${id}`);
  }

  update(id: number, candidate: any): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.apiUrl}/${id}`, candidate).pipe(
      catchError(error => {
        console.error('Error updating candidate:', error);
        return throwError(() => new Error('Failed to update candidate. Please try again later.'));
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchCandidates(params: any): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.apiUrl}/search`, { params });
  }


  downloadFilteredCsv(jmbg: string, email: string, employmentStatus: string): Observable<Blob> {
    const params: any = {};
    if (jmbg) params.jmbg = jmbg;
    if (email) params.email = email;
    if (!employmentStatus || employmentStatus) params.employedAfterCompetition = employmentStatus;

    console.log('Params sent to server:', params);

    return this.http.get(`${this.apiUrl}/download`, { params, responseType: 'blob' });
  }

  downloadAllCandidatesCsv(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/downloadAll`, { responseType: 'blob' });
  }
}
