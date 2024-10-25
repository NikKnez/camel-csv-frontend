export interface Candidate {
  id?: number;
  firstName: string;
  lastName: string;
  jmbg: string;
  yearOfBirth: number;
  email: string;
  phone?: string;
  notes?: string;
  employedAfterCompetition?: boolean;
  dataUpdate?: Date;
}
