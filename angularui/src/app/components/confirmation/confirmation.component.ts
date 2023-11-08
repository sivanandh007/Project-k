import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  movieName: string = '';
  theaterName: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  selectedSeats: string[] = [];
  totalFare: number = 0;

  constructor(private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    // Retrieve data from the route parameters
    this.router.navigate(['/confirmation'], {
      queryParams: {
        movieName: this.movieName,
        theaterName: this.theaterName,
        date: this.selectedDate,
        time: this.selectedTime,
        seats: this.selectedSeats.join(','), // Convert seats array to a comma-separated string
        totalFare: this.totalFare,
      }
      
    });
    
    
    // In ConfirmationComponent
    console.log(this.movieName, this.theaterName, this.selectedDate, this.selectedTime, this.selectedSeats, this.totalFare);
  }
  printConfirmation() {
    window.print();
    this.router.navigate(['/dashboard']);
    
  }
}
