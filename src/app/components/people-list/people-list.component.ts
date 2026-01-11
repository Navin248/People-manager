import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../model/person.model';

@Component({
    selector: 'app-people-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
    people: Person[] = [];

    constructor(private peopleService: PeopleService) { }

    ngOnInit(): void {
        this.peopleService.getAll().subscribe({
            next: (data) => {
                this.people = data;
            },
            error: (e) => console.error(e)
        });
    }

    deletePerson(id: number): void {
        if (confirm('Are you sure you want to delete this person?')) {
            this.peopleService.delete(id).subscribe(() => {
                this.people = this.people.filter(p => p.id !== id);
            });
        }
    }
}
