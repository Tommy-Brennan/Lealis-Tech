import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.contactForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      message: ['']
    });
  }

  onSubmit() {
  const formData = this.contactForm.value;

  this.http.post('/api/send-email', formData)
    .subscribe({
      next: () => alert('Message sent!'),
      error: () => alert('Something went wrong')
    });
  }
}