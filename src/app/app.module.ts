import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import { StoreModule } from '@ngrx/store';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';

import {
  AppComponent,
} from './containers';

import {
  HeaderComponent,
  ProcessBlockComponent,
  FixpartsManagerComponent,
} from './components';

import { reducer } from './store/reducers';

import '../styles/styles.scss';
import '../styles/headings.css';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HeaderComponent,
    ProcessBlockComponent,
    FixpartsManagerComponent,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.provideStore(reducer),
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
  ]
})
export class AppModule {}
