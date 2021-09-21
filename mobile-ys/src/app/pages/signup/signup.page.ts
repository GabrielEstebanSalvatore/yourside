import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cliente } from 'src/app/core/models/clientModel';

import { ClientService } from 'src/app/core/services/clientService/client.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  cliente : Cliente;

  constructor(private clientService: ClientService, private router: Router) { 
    this.cliente = {
      name: "",
      address: "",
      email: "",
      password: "",
      cell: "",
      role: "USER_ROLE",
      state: 1
    }
  }

  ngOnInit() {
  }

  createClient = () =>{
    this.clientService.insert(this.cliente).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      error => console.log(error)
    )    
  }

}
