import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiBaseUrl = 'http://localhost:3000/api/';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}


  public getToken(): string | null {
    try {
      const token = localStorage.getItem('travlr-token'); 
      return token;
    } catch (error) {
      return null;
    }
  }

  public saveToken(token: string): void {
    if (!token) {
      return;
    }

    try {
      localStorage.setItem('travlr-token', token); 
    } catch (error) {
    }
  }


  public login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}login`, user)
      .pipe(
        tap(response => {
          if (response.token) {
            this.saveToken(response.token);
          } else {
          }
        }),
        catchError(error => {
          return throwError(() => new Error(error.message || "Login failed."));
        })
      );
  }


  public isLoggedIn(): boolean {
    const token: string | null = this.getToken();
    
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      const isValid = payload.exp > (Date.now() / 1000);
      
      if (!isValid) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }


  public logout(): void {
    try {
      localStorage.removeItem('travlr-token');
    } catch (error) {
    }
  }
}
