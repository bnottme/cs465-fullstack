import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trip } from '../models/trip';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripsUrl = `${this.apiBaseUrl}trips`;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.storage.getItem('travlr-token');
    return token ? new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }) : new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => this.handleError(error, 'Fetching trips failed'))
      );
  }

  getTrip(tripCode: string): Observable<Trip> {
    if (!tripCode) {
      return throwError(() => new Error("Invalid trip code"));
    }

    const cleanedTripCode = encodeURIComponent(tripCode.trim());
    return this.http.get<Trip>(`${this.tripsUrl}/${cleanedTripCode}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => this.handleError(error, `Fetching trip ${tripCode} failed`))
      );
  }

  addTrip(trip: Trip): Observable<Trip> {
    if (!trip) {
      return throwError(() => new Error("Trip data is required for adding a trip"));
    }

    return this.http.post<Trip>(this.tripsUrl, JSON.stringify(trip), { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => this.handleError(error, "Adding trip failed"))
      );
  }

  updateTrip(trip: Trip): Observable<Trip> {
    if (!trip || !trip.code) {
      return throwError(() => new Error("Trip data is required for updating a trip"));
    }

    const cleanedTripCode = encodeURIComponent(trip.code.trim());
    return this.http.put<Trip>(`${this.tripsUrl}/${cleanedTripCode}`, JSON.stringify(trip), { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => this.handleError(error, `Updating trip ${trip.code} failed`))
      );
  }

  deleteTrip(tripCode: string): Observable<any> {
    if (!tripCode) {
      return throwError(() => new Error("Trip code is required for deleting a trip"));
    }

    const cleanedTripCode = encodeURIComponent(tripCode.trim());
    return this.http.delete(`${this.tripsUrl}/${cleanedTripCode}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => this.handleError(error, `Deleting trip ${tripCode} failed`))
      );
  }

  private handleError(error: any, actionMessage: string): Observable<never> {
    let errorMessage = "An unknown error occurred.";

    if (error.status === 401) {
      errorMessage = "Unauthorized: Please log in again.";
    } else if (error.status === 404) {
      errorMessage = "Resource not found.";
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}
