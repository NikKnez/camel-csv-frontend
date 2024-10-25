import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../candidate/candidate-model/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'http://localhost:8080/api/candidates';

  constructor(private http: HttpClient) {}


  addCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.apiUrl, candidate);
  }

  getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.apiUrl);
  }

  get(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiUrl}/${id}`);
  }

  update(id: number, candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.apiUrl}/${id}`, candidate);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchCandidates(jmbg: string, email: string, employedAfterCompetition: boolean): Observable<Candidate[]> {
    const params = { jmbg, email, employedAfterCompetition: employedAfterCompetition.toString() };
    return this.http.get<Candidate[]>(`${this.apiUrl}/search`, { params });
  }

  downloadCsv(jmbg: string, email: string, employedAfterCompetition: boolean): Observable<Blob> {
    const params = { jmbg, email, employedAfterCompetition: employedAfterCompetition.toString() };
    return this.http.get(`${this.apiUrl}/download`, { params, responseType: 'blob' });
  }
}
