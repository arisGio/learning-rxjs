import { Component, OnInit } from '@angular/core';
// step 1
import { Subject } from 'rxjs';
// step 2
import { filter } from 'rxjs';

interface Weather {
  day: string;
  temperature: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayWeather: Weather[] = [];
  // step 3
  weatherSubject = new Subject<Weather>();

  private weatherData = [
    {
      day: 'Monday',
      temperature: 61,
    },
    {
      day: 'Tuesday',
      temperature: 72,
    },
    {
      day: 'Wednesday',
      temperature: 76,
    },
    {
      day: 'Thursday',
      temperature: 49,
    },
    {
      day: 'Friday',
      temperature: 53,
    },
    {
      day: 'Saturday',
      temperature: 62,
    },
    {
      day: 'Sunday',
      temperature: 77,
    },
  ];

  ngOnInit() { 
    // step 5
    this.weatherSubject.pipe(filter(weather => {
      return weather.temperature >= 72;
    })).subscribe( weather => {
      // step 6
      this.displayWeather.push(weather);
    });
  }

  getWeatherData() {
    // step 4
    for (const weather of this.weatherData) {
      this.weatherSubject.next(weather);
    }
  }
}
