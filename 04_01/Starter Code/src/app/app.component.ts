import { Component, OnInit } from '@angular/core';
// step 1
import { Subject } from 'rxjs';
// step 2
import { combineLatestWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // step 3
  temperatureSubject$ = new Subject<number>();
  // step 4
  feelsLikeSubject$ = new Subject<number>();
  temperatureDataList: number[] = [];
  inputTemperature = 0;
  inputFeelsLikeTemperature = 0;
  displayText = '';

  ngOnInit() {
    // step 7
    this.temperatureSubject$
    .pipe(combineLatestWith(this.feelsLikeSubject$))
    .subscribe(([temperature, feelsLikeTemperature]) => {
      this.displayText = `It's ${temperature} F, but it feels like ${feelsLikeTemperature} F`;
    })
  }

  setTemperature() {
    // step 5
    this.temperatureSubject$.next(this.inputTemperature);
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input);
  }

  setFeelsLike() {
    // step 6
    this.feelsLikeSubject$.next(this.inputFeelsLikeTemperature);
  }

  setInputFeelsLike(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputFeelsLikeTemperature = parseInt(input);
  }
}
