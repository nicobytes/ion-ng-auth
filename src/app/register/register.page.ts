import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  register() {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();
      this.auth
        .register(email, password)
        .then(() => {
          this.router.navigate(['/products']);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
