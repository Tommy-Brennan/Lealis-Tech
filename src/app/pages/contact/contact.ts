import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from './email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  // Form setup with validation
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  public contactForm: FormGroup;
  constructor() {
    this.contactForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      company: ['', [Validators.maxLength(100)]],
      role: ['', [Validators.maxLength(50)]],
      phone: ['', [Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }

  // Email service injection
  private readonly emailService: EmailService = inject(EmailService);
  private lastSubmitTime: number = 0;
  public isSending: boolean = false;

  onSubmit() {
    // Rate Limiting: Prevent multiple submissions within 5 seconds
    const now = Date.now();
    if (now - this.lastSubmitTime < 5000) {
      alert('Please wait a few seconds before submitting again.');
      return;
    }
    this.lastSubmitTime = now;

    // Validate form and prevent multiple submissions
    if (this.contactForm.invalid || this.isSending) return;
    this.isSending = true;

    // Send email using the EmailService
    this.emailService
      .sendEmail(this.contactForm.value)
      .then(() => {
        this.isSending = false;
        alert('Email sent successfully!');
        this.contactForm.reset();
      })
      .catch((error) => {
        this.isSending = false;
        console.error('Error sending email:', error);
        alert('Failed to send email. Please try again later.');
      });
  }
}
