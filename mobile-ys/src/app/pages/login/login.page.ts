import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  client : any;
  constructor(private authService: AuthService, private router: Router) { 
    this.client = {
      email: "",
      password: ""
    }
  }

  ngOnInit() {
  }

  validate = () => {
    this.authService.getValidation(this.client).subscribe(
      res => {
        let response: any = { token: ""}
        response = res;
        localStorage.setItem("token", response.token);
        this.router.navigate(['/home']);
      },
      error => console.log(error)
    )
  }

}
