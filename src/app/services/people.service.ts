import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../model/person.model';

@Injectable({
    providedIn: 'root'
})
export class PeopleService {
    private apiUrl = 'https://jsonplaceholder.typicode.com/users';
    private people: Person[] = [];

    constructor(private http: HttpClient) { }

    getAll(): Observable<Person[]> {
        if (this.people.length > 0) {
            return new Observable(observer => {
                observer.next(this.people);
                observer.complete();
            });
        }
        return new Observable(observer => {
            this.http.get<Person[]>(this.apiUrl).subscribe(data => {
                this.people = data;
                observer.next(this.people);
                observer.complete();
            });
        });
    }

    get(id: number): Observable<Person> {
        const person = this.people.find(p => p.id === id);
        if (person) {
            return new Observable(observer => {
                observer.next(person);
                observer.complete();
            });
        }
        return this.http.get<Person>(`${this.apiUrl}/${id}`);
    }

    create(person: Person): Observable<Person> {
        // Generate a fake ID
        person.id = this.people.length > 0 ? Math.max(...this.people.map(p => p.id)) + 1 : 1;
        this.people.push(person);
        return new Observable(observer => {
            observer.next(person);
            observer.complete();
        });
    }

    update(person: Person): Observable<Person> {
        const index = this.people.findIndex(p => p.id === person.id);
        if (index !== -1) {
            this.people[index] = person;
        }
        return new Observable(observer => {
            observer.next(person);
            observer.complete();
        });
    }

    delete(id: number): Observable<void> {
        this.people = this.people.filter(p => p.id !== id);
        return new Observable(observer => {
            observer.next();
            observer.complete();
        });
    }
}
