import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { AuthService } from 'src/app/core/services/authService/auth.service';
import { AstMemoryEfficientTransformer } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  client : any;
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { 
    this.client = {
      email: "",
      password: ""
    }
  }

  ngOnInit() {
  }

  validate = () => {
    this.authService.getValidation(this.client).subscribe(
      (res:any) => {
        localStorage.setItem("token", res.token);
        this.router.navigate(['/home']);
      },
      error => console.log(error)
    )
  }

}
