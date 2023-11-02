import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CheckTokenGuard } from './check-token.guard';
import { AttachTokenInterceptor } from './attach-token.interceptor';
import { StateService } from './state.service';
import { HomeComponent } from './home.component';
//import { SignUpComponent } from './sign-up.component';

const refreshToken = ( stateService: StateService) => {
  return () => {
    const stored_state = localStorage.getItem('STATE')
    if (stored_state) {
      stateService.state.next(JSON.parse(stored_state))
    }
  }
}

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, title: 'Home' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'signup', component: SignupComponent, title: 'Sign Up' },
      {
        path: 'goals',
        loadChildren: () =>
          import('./goals/goal.module').then((m) => m.GoalModule),
          canActivate: [CheckTokenGuard]
      },
    ]),
  ],
  providers: [
    { 
      provide: APP_INITIALIZER,
      useFactory: refreshToken,
      deps: [StateService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AttachTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
