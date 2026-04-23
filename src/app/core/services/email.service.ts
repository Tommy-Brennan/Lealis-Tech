import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { IContactForm } from './models/IContactForm';
import { EMAIL_SERVICE_CONSTANTS } from './models/emailServiceConstants';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private serviceId: string = EMAIL_SERVICE_CONSTANTS.SERVICE_ID;
  private templateId: string = EMAIL_SERVICE_CONSTANTS.TEMPLATE_ID;
  private publicKey: string = EMAIL_SERVICE_CONSTANTS.PUBLIC_KEY;

  sendEmail(form: IContactForm): Promise<EmailJSResponseStatus> {
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
