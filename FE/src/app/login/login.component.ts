import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    // username : "admin1",
    // password : "123456"
  };
  isLoginFailed = false;
  errorMessage = '';

  isSignupSuccess = false;
  successMessage = '';

  constructor(private router: Router, private tokenService: TokenService, private userService: UserService, public dataService: DataService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.router.navigate(['home']);
    }
    if(typeof(this.dataService.serviceData) !== "undefined"){
      this.isSignupSuccess = true;
      this.successMessage = this.dataService.serviceData;
    }
  }
  onSubmit(): void {
    this.userService.login(this.form).subscribe(
      data => {
        console.log(data);
        this.tokenService.saveToken(data.data.token);
        this.isLoginFailed = false;
        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  } 

}
