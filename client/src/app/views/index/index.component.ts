import { Component, OnInit } from '@angular/core';
import { RequestLogin } from 'src/app/resources/models/RequestLogin';
import { LoginService } from 'src/app/resources/services/login.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/resources/services/token-storage.service';
import { RequestRegister } from 'src/app/resources/models/RequestRegister';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  hide = true;

  public requestLogin: RequestLogin;
  public requestRegister: RequestRegister;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.requestLogin = new RequestLogin(); 
    this.requestRegister = new RequestRegister(); 
  }

  public doLogin(): void {
    this.loginService.doLogin(this.requestLogin).subscribe(
      (data) => {       
        this.tokenStorage.saveToken(data.token);
        this.router.navigate(['task']);
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }

  reset() {
    this.requestRegister.name =''
    this.requestRegister.email =''
    this.requestRegister.password =''
  }

  public doRegister(): void {

    this.loginService.doRegister(this.requestRegister).subscribe(
      (data) => {
        console.log(data)
        alert(data)
        this.reset()
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }

}
