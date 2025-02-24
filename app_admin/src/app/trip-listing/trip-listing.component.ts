import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { TripCardComponent } from '../trip-card/trip-card.component';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  errorMessage: string = '';

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  private loadTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (data: Trip[]) => {
        this.trips = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load trips. Please try again later.';
      }
    });
  }
}
