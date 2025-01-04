import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { appRouting } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [  provideHttpClient(), appRouting, importProvidersFrom(BrowserAnimationsModule),provideAnimations(),  provideToastr({ // تكوين `ngx-toastr`
    timeOut: 3000,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true
  })],
});
