import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  form: any = {
  };
  isAuthFailed = false;
  errorMessage = '';

  mail: string = '';

  constructor(private router: Router, private userService: UserService, public dataService: DataService) { }

  ngOnInit(): void {
    console.log(this.dataService.serviceData);
    if(typeof(this.dataService.serviceData) === "undefined"){
      this.router.navigate(['signup']);
    }
    this.mail = this.dataService.serviceData;
    this.form.mail = this.dataService.serviceData;
  }

  onSubmit(): void {
    this.userService.auth(this.form).subscribe(
      data => {
        console.log(data);
        this.dataService.serviceData = data.message;
        this.router.navigate(['login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isAuthFailed = true;
      }
    );

  }

}
