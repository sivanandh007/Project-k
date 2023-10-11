import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service'; // Replace 'path-to-city-service' with the actual path

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cities: string[] = []; // Array to store city names
  selectedCity: string | null = null; // Store the selected city

  constructor(private cityService: CityService) {} // Inject the CityService

  ngOnInit() {
    // Fetch city names from the backend
    this.cityService.getCities().subscribe((data: string[]) => {
      this.cities = data;
    });
  }

  selectCity(city: string) {
    // Handle the city selection here
    this.selectedCity = city;
    // You can add further actions related to city selection, like navigating to the next page, etc.
  }
}
