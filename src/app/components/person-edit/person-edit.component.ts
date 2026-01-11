import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../model/person.model';

@Component({
    selector: 'app-person-edit',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './person-edit.component.html',
    styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
    personForm: FormGroup;
    isEditMode = false;
    personId: number | null = null;
    submitted = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private peopleService: PeopleService
    ) {
        this.personForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            username: [''],
            phone: ['']
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.personId = +id;
            this.peopleService.get(this.personId).subscribe(person => {
                this.personForm.patchValue(person);
            });
        }
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.personForm.invalid) {
            return;
        }

        const personData: Person = {
            id: this.personId || 0,
            ...this.personForm.value
        };

        if (this.isEditMode) {
            this.peopleService.update(personData).subscribe(() => {
                this.router.navigate(['/people']);
            });
        } else {
            // JSONPlaceholder generate ID automatically on POST usually, but we are mocking somewhat
            // Actually jsonplaceholder returns the object with id 101 always for post
            // Implementation detail: for this test, we just navigate back
            this.peopleService.create(personData).subscribe(() => {
                this.router.navigate(['/people']);
            });
        }
    }
}
