import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchPatientService } from './service/SearchPatientService';
import { HttpClientModule } from '@angular/common/http';
import { ReadMoreComponent } from './read-more/read-more.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown, faCoffee, faSort, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { KeyWordHighlightPipe } from './pipe/key-word-highlight.pipe';
library.add(faChevronRight);
library.add(faChevronDown);

@NgModule({
  declarations: [
    AppComponent,
    ReadMoreComponent,
    KeyWordHighlightPipe,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [SearchPatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
