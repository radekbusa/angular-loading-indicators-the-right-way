import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { LoadingDirective } from "./loading/loading-directive/loading.directive";
import { LoadingSpinnerComponent } from "./loading/loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [AppComponent, LoadingSpinnerComponent, LoadingDirective],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
