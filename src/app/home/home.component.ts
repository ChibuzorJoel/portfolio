import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  formData = {
    name: '',
    email: '',
    message: '',
  };

  mailSuccess = false;
  mailFailed = false;
  isSubmitting = false; // To disable the button while submitting

  async onSubmit(form: any) {
    if (form.valid) {
      this.isSubmitting = true; // Disable the button
      try {
        await this.sendEmail(this.formData);
        this.mailSuccess = true; // Show success message
        this.mailFailed = false;
        console.log('Email sent successfully!');
        form.resetForm(); // Reset the form
      } catch (error) {
        this.mailSuccess = false;
        this.mailFailed = true; // Show error message
        console.error('Failed to send email:', error);
      } finally {
        this.isSubmitting = false; // Re-enable the button
      }
    } else {
      console.error('Form validation failed');
      this.mailSuccess = false;
      this.mailFailed = false;
    }
  }

  sendEmail(data: any): Promise<void> {
    // Mock API call to simulate email sending
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success or failure randomly
        if (Math.random() > 0.5) resolve();
        else reject('Email sending failed due to server error.');
      }, 1000); // Simulate network delay
    });
  }
}