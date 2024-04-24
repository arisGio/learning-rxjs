import { Component, OnInit } from '@angular/core';
// step 1
import { ReplaySubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  temperatureDataList: number[] = [];
  inputTemperature = 0;
  // step 2
  temperatureSubject$ = new ReplaySubject<number>();
  // step 3
  replaySubscription: Subscription | undefined;

  ngOnInit() {
  }

  setTemperature() {
    const temperature = this.inputTemperature;
    // step 7
    this.temperatureSubject$.next(temperature);
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input);
  }

  addSubscription() {
    // step 4
    if (this.replaySubscription) {
      return;
    }
    this.temperatureDataList = [];
    // step 5
    this.replaySubscription = this.temperatureSubject$.subscribe((temperature) => {
      this.temperatureDataList.push(temperature)
    })
  }

  removeSubscription() {
    // step 6
    this.temperatureDataList = [];
    this.replaySubscription?.unsubscribe();
    this.replaySubscription = undefined;
  }
}
