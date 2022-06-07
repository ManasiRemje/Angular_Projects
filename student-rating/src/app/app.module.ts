import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GiveRatingComponent } from './give-rating/give-rating.component';
import { LoginComponent } from './login/login.component';
import { UpdateRatingComponent } from './update-rating/update-rating.component';
import { HistoryComponent } from './history/history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RoutingComponents } from './app-routing.module';
import { TokenInterceptorService } from './token-interceptor.service';
import { AdminComponent } from './admin/admin.component';
import { FilterComponent } from './filter/filter.component';
import { TrainerComponent } from './trainer/trainer.component';

@NgModule({
  declarations: [
    AppComponent,
    GiveRatingComponent,
    LoginComponent,
    UpdateRatingComponent,
    HistoryComponent,
    RoutingComponents,
    AdminComponent,
    FilterComponent,
    TrainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
