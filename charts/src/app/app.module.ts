import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ComponentsModule,
    HttpClientModule,
    CommonModule,
    SocialLoginModule,
    UserModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('1096981444168-nrvgbd51suru2vd028c1uvj4qncjg1f5.apps.googleusercontent.com'),
        },
      ],
    } as SocialAuthServiceConfig,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
