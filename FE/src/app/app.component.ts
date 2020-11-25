import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username: string;


  constructor(private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
  }

  logout(): void {
    if(confirm("確認: ログアウトを実行しませんか？")) {
      this.tokenService.signOut();
    }
  }


}
