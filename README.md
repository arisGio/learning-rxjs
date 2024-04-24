### learning-rxjs

## 1 - Evolving toward RxJS

### Reactive vs asyncronous programming
- Reactive programming is programming with asynchronous data streams.
    -  This technique works with data that is consistently streamed and needs to be handled.

### Observer pattern for RxJS
- Observer - Subscriber pattern
- Observer
    - listens to data change events
- Subscriber
    - who actually does things & reacts to those data change events
- An observer may have one or many subscribers & each subscriber can react differently to an observer's data change event.
- RxJS was designed as a framework for this pattern.

## 2 - Key RxJS Concepts

### Reading data with behavior subjects
- Passes current value to subscription function on subscription
- BehaviorSubject
    - An observable that allows the user to get the current value at any time.
- initialized with a default value

### Subscribing to changes using subjects
- Input to Observable > Subscription > Output Data
- Subject (aka regular subject)
    - A standard observable that listens to input and broadcasts those events to all subscribers
    - does not require initial value
    - does not immediately emit current value for new subscriptions
    - broadcasts events to every subscriber for every new value
- BehaviorSubject
    - requires initial value
    - emits current value on subscription
    - broadcasts events to every subscriber for every new value

### Replaying changes with replay subjects
- BehaviorSubject
    - has an initial value and can access the current value anytime
- Subject
    - doesn’t have an initial value and passes new data as it receives it
- ReplaySubject
    - remembers data passed to it and passes all of that data to new subscribers
- ReplaySubject
    - A type of subject that remembers previously passed values and passes all of them to new subscriptions