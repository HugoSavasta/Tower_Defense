import { FloatingMessage } from "./utils.js";
import { floatingMessages } from "./constants.js";
export class Observer {
  constructor(name) {

      if (Observer.instance) {
        return Observer.instance;
      }
      Observer.instance = this;
      this.name = name;
      
  }

  notify(eventData) {
    console.log(eventData.message);
  }
}


class Publisher {
  constructor() {
      this.observers = [];
  }

  subscribe(observer) {
      this.observers.push(observer);
  }

  unsubscribe(observer) {
      this.observers = this.observers.filter(subscriber => subscriber !== observer);
  }

  notifyObservers(eventData) {
      this.observers.forEach(observer => observer.notify(eventData));
  }
}


export const gamePublisher = new Publisher();