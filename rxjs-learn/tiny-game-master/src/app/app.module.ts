import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreakoutCanvasService } from './service/breakout-canvas.service';
import { BreakoutService } from './service/breakout.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BreakoutCanvasService, BreakoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
