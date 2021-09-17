import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cliente } from 'src/app/core/models/clientModel';

import { ClientService } from 'src/app/core/services/clientService/client.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

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
    this.clientService.getAll().subscribe(
      res =>{
        console.log(res)
      },
      error => console.log(error)
    )
  }

  createClient = () =>{

    this.clientService.insert(this.cliente).subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/login']);
      },
      error => console.log(error)
    )      
  }

}
