// theaters.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TheaterService } from 'src/app/services/theaters.service';
import * as moment from 'moment';

@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.css'],
})
export class TheatersComponent implements OnInit {
  theaters: any[] = [];
  theaterFilter: string = '';
  filteredTheaters: any[] = [];
  dates: string[] = [];
  selectedDate: string = moment().format('DD MMM ddd');
  showTimes: string[] = [];

  constructor(private theaterService: TheaterService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.generateDates();
    this.updateShowTimes();
    this.getTheaters();
  }

  filterTheaters() {
    if (this.theaterFilter) {
      this.filteredTheaters = this.theaters.filter((theater: any) =>
        theater.theaterName.toLowerCase().includes(this.theaterFilter.toLowerCase())
      );
    } else {
      this.filteredTheaters = this.theaters; // If search input is empty, show all theaters
    }
  }

  generateDates() {
    const today = moment();
    for (let i = 0; i < 7; i++) {
      const date = today.clone().add(i, 'days');
      const formattedDate = date.format('DD MMM ddd');
      this.dates.push(formattedDate);
    }
  }

  selectDate(date: string) {
    this.selectedDate = date;
    this.updateShowTimes();
  }

  generateShowTimes(): string[] {
    const showTimes: string[] = [];
    let showTime = moment(this.selectedDate, 'DD MMM ddd').hour(9).minute(45); // First show time
    const currentTime = moment(); // Current system time

    // Generate show times for the day (e.g., four shows)
    for (let i = 0; i < 4; i++) {
      if (currentTime.isBefore(showTime)) {
        showTimes.push(showTime.format('h:mm A'));
      }
      showTime = showTime.add(230, 'minutes'); // Increment by 2 hours for the next show
    }

    return showTimes;
  }

  updateShowTimes() {
    const currentDate = moment();
    const selectedDateMoment = moment(this.selectedDate, 'DD MMM ddd');
    const selectedDateEnd = selectedDateMoment.clone().endOf('day');

    if (currentDate.isBefore(selectedDateEnd)) {
      this.showTimes = this.generateShowTimes();
    } else {
      this.showTimes = [];
    }
  }

  getTheaters() {
    const movieIdParam = this.route.snapshot.paramMap.get('movieId');
    if (movieIdParam !== null) {
      const movieId = +movieIdParam;
      if (!isNaN(movieId)) {
        this.theaterService.getTheatersByMovie(movieId).subscribe(
          (data: any) => {
            if (Array.isArray(data.$values)) {
              this.theaters = data.$values;
              this.filteredTheaters = this.theaters;
            } else {
              console.error('Unexpected data structure:', data);
            }
          },
          (error) => {
            console.error('Error fetching theaters:', error);
          }
        );
      } else {
        console.error('Invalid movieId:', movieIdParam);
      }
    } else {
      console.error('movieId is null.');
    }
  }

  handleShowTimeClick(time: string) {
    console.log(`You clicked on the show time: ${time}`);
  }
}
