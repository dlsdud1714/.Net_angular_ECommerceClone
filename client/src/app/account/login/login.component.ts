import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform = new FormGroup({
    Email: new FormControl('',Validators.required),
    Password: new FormControl('',Validators.required)
  })

  onSubmit() {
    this.accountService.login(this.loginform.value).subscribe(user=>console.log(user))
  } 

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

}
