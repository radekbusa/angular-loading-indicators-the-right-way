import { Component, OnInit } from "@angular/core";
import { of, asyncScheduler } from "rxjs";
import { LoadingService } from "./loading/loading.service";
import { delay } from "rxjs/operators";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

// contains identifiers of all loading indicators in this component
enum LoadingIndicator {
  OPERATOR,
  MANUAL,
  ASYNC_PIPE
}

@UntilDestroy()
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  subscriptionText = "";
  manualText = "";
  LoadingIndicator = LoadingIndicator;

  loadCounter = 1;

  // this.loadingService.doLoading is a special method which behaves like an observable creation operator
  asyncText$ = this.loadingService.doLoading(
    // .delay(...) simulates network delay
    of(`Peek-a-boo ${this.loadCounter++}`).pipe(delay(4000)),
    this,
    LoadingIndicator.ASYNC_PIPE
  );

  constructor(
    public loadingService: LoadingService // accessed from the template
  ) {}

  ngOnInit(): void {
    this.subscriptionExample();
    this.manualExample();
  }

  refreshSubscription(): void {
    this.subscriptionExample();
  }

  refreshManual(): void {
    this.manualExample();
  }

  protected subscriptionExample(): void {
    this.loadingService
      .doLoading(
        of(`Peek-a-boo ${this.loadCounter++}`).pipe(delay(2000)),
        this,
        LoadingIndicator.OPERATOR
      )
      .pipe(untilDestroyed(this))
      .subscribe(text => (this.subscriptionText = text));
  }

  protected manualExample(): void {
    this.loadingService.startLoading(this, LoadingIndicator.MANUAL);

    // In case you need to mock your observables using of(...),
    // don't forget to make them async-scheduled in manual scenarios!
    of(`Peek-a-boo ${this.loadCounter++}`, asyncScheduler)
      .pipe(
        delay(6000),
        untilDestroyed(this)
      )
      .subscribe(text => {
        this.loadingService.endLoading(this, LoadingIndicator.MANUAL);
        this.manualText = text;
      });
  }
}
