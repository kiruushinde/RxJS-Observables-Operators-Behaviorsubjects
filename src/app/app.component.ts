import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  filter,
  from,
  fromEvent,
  map,
  of,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'rxjs';

  users$: Observable<string> | undefined;

  // 📌 observable from array of strings
  studentName = ['kiran', 'meow', 'utkuuu'];
  studentNames$: Observable<string[]> = of(this.studentName);

  // 📌 observable from object
  studentObj = {
    id: 1,
    name: 'kiran',
  };
  studentObj$: Observable<any> = of(this.studentObj);

  // 📌 observable from array but using from operator
  deptartments = ['cse', 'it', 'mechanical'];
  depts$: Observable<string> = from(this.deptartments);

  // 📌 pipe method
  numbers = [1, 2, 3, 4];
  numbers$: Observable<any> = from(this.numbers).pipe(
    map((val: any) => val * 2)
  );

  // 📌 pipe and map
  users = [
    { id: 1, name: 'kiran' },
    { id: 2, name: 'Utkuu' },
  ];

  user$ = of(this.users);
  usernames$ = this.user$.pipe(map((users) => users));

  // 📌 filter
  array = [1, 1, 1, 2, 3, 2, 3, 10, 8, 6];
  filterdArray$ = from(this.array).pipe(filter((num) => num % 2 == 0));
  arr: any = [];

  constructor() {
    this.getUsers();
  }

  // 📌 behavior subject
  mySub$ = new BehaviorSubject<{ id: string; name: string } | null>(null);
  // you can now emit the data, and then subscribe to it

  // 📌 fromEvent
  // documentClick$ = fromEvent(document, 'click');

  ngOnInit(): void {
    // #️⃣ imp -> behaviourSubject
    setTimeout(() => {
      this.mySub$.next({ id: '1', name: 'kiran' });
    }, 2000);
    // when you do .next() method then you can use async pipe in your template to display the data

    this.mySub$.subscribe((data) => {
      console.log('current user is : ', data);
    });

    // you always need to subscribe observable
    this.studentNames$.subscribe((data) => {
      console.log('creating observable from array of strings : ', data);
    });

    this.studentObj$.subscribe((data) => {
      console.log('creating observable from an object', data);
    });

    this.depts$.subscribe((data) => {
      console.log('using from operator : ', data);
    });

    this.numbers$.subscribe((data) => {
      console.log('map method ', data);
    });

    this.user$.subscribe((data) => {
      console.log('users names are : ', data);
      // data[0].id, data[0].name --> in this way you can access it.
    });

    this.filterdArray$.subscribe((data) => {
      this.arr.push(data);
    });

    console.log('filterd array is : ', this.arr);

    // this.documentClick$.subscribe((e) => {
    //   console.log('e', e);
    // });
  }
  getUsers() {
    this.users$ = new Observable(function (observer) {
      try {
        observer.next('Kiran');
        observer.next('Utkuu');
        observer.next('Meow');
      } catch (error) {
        console.error(error);
      }
    });

    this.users$.subscribe((res) => {
      console.log(res);
    });
  }
}
