import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  login() {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();
      this.auth.login(email, password)
      .then(() => {
        this.router.navigate(['/products']);
        this.form.reset();
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
