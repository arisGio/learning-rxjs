import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
// step 1
import { from } from 'rxjs';
// step 2
import { exhaustMap, delay, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  temperatureSubject$ = new Subject<number[]>();
  temperatureDataList: number[] = [];
  inputTemperature = 0;
  displayTemperatureText = '';
  callCount = 0;
  attemptedCallCount = 0;

  ngOnInit() {
    // step 4
    this.temperatureSubject$
    .pipe(exhaustMap((temperatureDataList) => {
      // step 6
      return from(temperatureDataList).pipe(delay(1000), toArray());
    }))
    .subscribe((temperatureDataList) => {
      this.temperatureDataList = temperatureDataList;
      // step 5
      this.callCount = this.callCount + 1;
    })
  }

  getWeather() {
    this.attemptedCallCount = this.attemptedCallCount + 1;
    const temperatureDataList = [51, 73, 64, 21];
    // step 3    
    this.temperatureSubject$.next(temperatureDataList);
  }
}
