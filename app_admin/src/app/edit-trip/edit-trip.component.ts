import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 🔹 Fix: Import CommonModule for *ngIf
import { ReactiveFormsModule } from '@angular/forms'; // 🔹 Fix: Import ReactiveFormsModule for form handling
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // 🔹 Fix: Ensure these modules are imported
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    // Retrieve stashed trip ID
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something went wrong, couldn't find tripCode!");
      this.router.navigate(['/']);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log('Retrieved tripCode:', tripCode);

    this.editForm = this.formBuilder.group({
      code: [tripCode.trim(), Validators.required],
      name: ["", Validators.required],
      length: ["", Validators.required],
      start: ["", Validators.required],
      resort: ["", Validators.required],
      perPerson: ["", Validators.required],
      image: ["", Validators.required],
      description: ['', Validators.required]
    });

    this.tripDataService.getTrip(tripCode.trim())
      .subscribe({
        next: (value: Trip) => {
          this.trip = value;
          this.editForm.patchValue(value); // Populate form with existing data
        },
        error: (error: any) => {
          console.error('Error fetching trip:', error);
        }
      });
  }

  public onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (error: any) => {
          }
        });
    }
  }

  get f() { return this.editForm.controls; }
}
