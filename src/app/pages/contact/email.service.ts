import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private serviceId = 'service_pmhlebk';
  private templateId = 'template_upft6wg';
  private publicKey = 'NKvtNPp94nO2pgGPO';

  sendEmail(form: any) {
    if (!form) throw new Error('Form is required');

    const templateParams = {
      firstName: form.firstName ?? '',
      lastName: form.lastName ?? '',
      company: form.company ?? '',
      role: form.role ?? '',
      phone: form.phone ?? '',
      email: form.email ?? '',
      message: form.message ?? '',
    };

    return emailjs.send(this.serviceId, this.templateId, templateParams, this.publicKey);
  }
}
