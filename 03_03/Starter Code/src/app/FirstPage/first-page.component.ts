import { Component, OnDestroy, OnInit } from '@angular/core';
// step 1
import { Subject } from 'rxjs';
// step 2
import { filter } from 'rxjs/operators';
// step 6
import { takeUntil } from 'rxjs/operators';

interface Weather {
  day: string;
  temperature: number;
}

@Component({
  selector: 'first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css'],
})
export class FirstPageComponent implements OnInit, OnDestroy {
  displayWeather: Weather[] = [];
  // step 3
  weatherSubject$ = new Subject<Weather>();
  // step 7
  destroySubject$ = new Subject<void>();

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
    // step 4
    this.weatherSubject$.pipe(takeUntil(this.destroySubject$),filter((weather) => {
      return weather.temperature >= 70;
    })).subscribe((weather) => {
      this.displayWeather.push(weather);
    });

    // step 5
    for (const weather of this.weatherData){
      this.weatherSubject$.next(weather);
    }
  }

  ngOnDestroy() {
    // step 8
    this.destroySubject$.next();
    this.destroySubject$.complete();
    console.log("Component Destroyed!");
  }
}
