import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../services/login.service';
import { CookiepopupComponent } from '../../components/cookiepopup/cookiepopup.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CookiepopupComponent,
    FormsModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  providers: [MessageService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cookiesAceitos: boolean;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private loginService: LoginService,
    private messageService: MessageService
  ) {
    this.cookiesAceitos = this.cookieService.get('aceitou_cookies') === 'true';
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successfully' });
  }

  public loginRequest: any = {
    email: '',
    password: '',
  };

  login() {
    this.loginService.post(this.loginRequest).subscribe(
      (response: any) => {
        console.log('Login bem-sucedido!', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('transactionId', response.transaction);
        localStorage.setItem('email', response.email);
        localStorage.setItem('clientId', response.id);
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.log('Erro ao fazer login!', error);
      }
    );
  }
}
