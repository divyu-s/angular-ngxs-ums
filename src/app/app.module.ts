import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app.component';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { UserUtilityService } from './userutility.service';
import { AppState } from './store/app.store';

@NgModule({
  declarations: [AppComponent, UserComponent],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([AppState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [UserUtilityService],
  bootstrap: [AppComponent],
})
export class AppModule {}
