import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CityService } from 'src/app/services/city.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStoreService } from 'src/app/services/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cities: any[] = [];
  selectedCity: string | null = null;
  selectedCityID: number | null = null;
  filteredCities: any[] = [];
  cityFilter: string = '';
  public users: any[] = [];
  public fullName: string = '';

  constructor(
    private cityService: CityService,
    private auth: AuthService,
    private userstore: UserStoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cityService.getCities().subscribe((data: any) => {
      if (Array.isArray(data.$values)) {
        this.cities = data.$values;
      } else {
        console.error('Unexpected data structure:', data);
      }
      this.filteredCities = this.cities;
      console.log(this.cities);
    });
    
    this.fullName = this.auth.getfullNameFromToken();
    this.userstore.getFullNameFromStore().subscribe(val => {
      this.fullName = val || this.auth.getfullNameFromToken();
    });
  }

  selectCity(city: any) {
    // Extract the city ID
    this.selectedCityID = city.cityID;
    
    // Set the selected city name
    this.selectedCity = city.cityName;
    
    // Use the Angular router to navigate to the "movies" route with the selected city as a parameter
    this.router.navigate(['/movies', this.selectedCityID]);
  }

  filterCities() {
    if (this.cityFilter) {
      this.filteredCities = this.cities.filter(city =>
        city.cityName.toLowerCase().includes(this.cityFilter.toLowerCase())
      );
    } else {
      this.filteredCities = this.cities;
    }
  }

  logout() {
    this.auth.signOut();
  }
}
