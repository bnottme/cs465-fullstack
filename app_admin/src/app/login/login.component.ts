import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthCredentials } from '../models/auth-credentials';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  public credentials: AuthCredentials = {
    email: '',
    password: '',
    name: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}




  public onLoginSubmit(): void {
    this.formError = '';

    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
      return;
    }

    this.doLogin();
  }


  
  private doLogin(): void {
    this.authenticationService.login(this.credentials).subscribe({
      next: (response) => {
        if (response.token) {
          this.authenticationService.saveToken(response.token); 
          console.log('🔹 Redirecting to list-trips...');
          this.router.navigateByUrl('/list-trips');
        } else {
          this.formError = 'Login failed: No token received.';
        }
      },
      error: (err) => {
        this.formError = err?.message || 'Login failed, please try again.';
      }
    });
  }
}
