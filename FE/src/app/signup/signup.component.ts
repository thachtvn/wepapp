import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: any = {
  };
  isRepasswordFailed = false;
  isSignupFailed = false;
  isSubmit = false;

  errorMessage = '';
  

  constructor(private router: Router, private userService: UserService, private tokenService: TokenService, public dataService: DataService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.router.navigate(['home']);
    }
  }

  onSubmit(): void {
    this.isSignupFailed = false;
    this.confirmRepassword(this.form.password, this.form.repassword);

    if(this.isRepasswordFailed == false && this.isSubmit == false){
      this.isSubmit = true;
      this.isSignupFailed = true;
      this.errorMessage = "　●　少々お待ちください。";
      this.userService.register(this.form).subscribe(
        data => {
          console.log(data);
          this.dataService.serviceData = this.form.mail;
          this.router.navigate(['auth']);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignupFailed = true;
          this.isSubmit = false;
        }
      );

    }
  }

  confirmRepassword(p1:string,p2:string){
    if(p1 === p2) this.isRepasswordFailed = false;
    else this.isRepasswordFailed = true;
  }

}
