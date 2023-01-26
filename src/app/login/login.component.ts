import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private http: HttpClient, private router: Router, private auth: AuthService) {}
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:[''],
    });
  }

    login() {
      this.http.get<any>("http://localhost:3000/singupUsers").subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      });

      if (user) {
        alert('Login Successfully');
        this.loginForm.reset();
        this.auth.storeToken(res.token);
        this.router.navigateByUrl('/list');
      }
      else {
        alert('User not found');
      }
    },err=> {
      alert('Something went wrong');
    })
  }
  
}
