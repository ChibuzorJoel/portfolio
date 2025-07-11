import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  contactForm: FormGroup;
  mailSuccess = false;
  mailFailed = false;
  isSubmitting = false;

  // ✅ Replace this with your actual Formspree endpoint
  private formspreeEndpoint = 'https://formspree.io/f/mdkzqpwr';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;
    this.mailSuccess = false;
    this.mailFailed = false;

    const formData = this.contactForm.value;

    this.http.post(this.formspreeEndpoint, formData).subscribe({
      next: () => {
        this.mailSuccess = true;
        this.contactForm.reset();
      },
      error: (error) => {
        console.error('Formspree error:', error);
        this.mailFailed = true;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
