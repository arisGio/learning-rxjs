import { Component, OnInit } from '@angular/core';
// step 1
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  inputTemperature = 0;
  originalTemperature = 0;
  displayTemperatureText = '';
  isCelsius = false;
  // step 2
  temperatureSubject$ = new Subject<number>();

  ngOnInit() {
    this.temperatureSubject$.subscribe((temperature) => {
      if (this.isCelsius) {
        this.displayTemperatureText = temperature + "C";
      } else {
        this.displayTemperatureText = temperature + "F";
      }

      this.inputTemperature = temperature;
    })
  }

  setTemperature() {
    this.originalTemperature = this.inputTemperature;
    this.isCelsius = false;
    // step 3
    this.temperatureSubject$.next(this.originalTemperature);
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input);
  }

  convertToCelsius() {
    this.isCelsius = true;
    const celsiusTemperature = ((this.inputTemperature - 32) * 5) / 9;
    // step 4a
    this.temperatureSubject$.next(celsiusTemperature);
  }

  convertToFahrenheit() {
    this.isCelsius = false;
    const fahrenheitTemperature = (this.inputTemperature * 9) / 5 + 32;
    // step 4b
    this.temperatureSubject$.next(fahrenheitTemperature);
  }
}
