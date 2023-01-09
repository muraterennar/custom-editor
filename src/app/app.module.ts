import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomEditorServiceModule } from './services/custom-editor-service/custom-editor-service.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomEditorServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
