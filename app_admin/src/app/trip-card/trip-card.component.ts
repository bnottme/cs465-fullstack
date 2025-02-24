import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripCardComponent implements OnInit {

  @Input() trip!: Trip;
  @Input() isFirstTrip: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public isValidPrice(): boolean {
    return typeof this.trip?.perPerson === 'number' && !isNaN(this.trip.perPerson);
  }

  public editTrip(trip: Trip) {
    if (this.isLoggedIn()) {
      localStorage.setItem('tripCode', trip.code);
      this.router.navigate(['/edit-trip']);
    }
  }

  public addTrip() {
    if (this.isLoggedIn()) {
      this.router.navigate(['/add-trip']);
    }
  }
}
