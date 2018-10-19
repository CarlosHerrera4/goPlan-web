import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { GlobalErrorHandlerService } from './shared/handlers/global-error-handler.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/misc/header/header.component';
import { LoginComponent } from './components/misc/login/login.component';
import { RegisterComponent } from './components/misc/register/register.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserItemComponent } from './components/user/user-item/user-item.component';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { PostItemComponent } from './components/post/post-item/post-item.component';
import { PostFormComponent } from './components/post/post-form/post-form.component';
import { PostCreateComponent } from './components/post/post-create/post-create.component';
import { PostDetailsComponent } from './components/post/post-details/post-details.component';
import { UserFilterPipe } from './shared/pipes/user-filter.pipe';
import { UserFinderComponent } from './components/user/user-finder/user-finder.component';
import { IntroPipe } from './shared/pipes/intro.pipe';
import { EventItemComponent } from './components/event/event-item/event-item.component';
import { EventListComponent } from './components/event/event-list/event-list.component';
import { EventNightlifeComponent } from './components/event/event-list/event-nightlife/event-nightlife.component';
import { EventSportComponent } from './components/event/event-list/event-sport/event-sport.component';
import { CategoryPipe } from './category.pipe';
import { EsriMapComponent } from './components/misc/esri-map/esri-map.component';
// import { EventMapComponent } from './components/event/event-map/event-map.component';
// import { AgmCoreModule } from '@agm/core';
// import { EsriMapComponent } from './esri-map/esri-map.component';

import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './components/misc/map/map.component';
import { MapDetailComponent } from './components/misc/map-detail/map-detail.component';
import { EventComponent } from './components/event/event/event.component';
import { PlanComponent } from './components/plan/plan.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    UserItemComponent,
    PostListComponent,
    PostItemComponent,
    PostFormComponent,
    PostCreateComponent,
    PostDetailsComponent,
    UserFilterPipe,
    UserFinderComponent,
    IntroPipe,
    EventItemComponent,
    EventListComponent,
    EventNightlifeComponent,
    EventSportComponent,
    CategoryPipe,
    EsriMapComponent,
    MapComponent,
    MapDetailComponent,
    EventComponent,
    PlanComponent
    // EventMapComponent

    // EsriMapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYJ_Kqaf1Lv5_SxVhMZYS-hTs7oYodpVY'
    })
    // AgmCoreModule.forRoot({
    //   apiKey: ''
    // })
    // MDBBootstrapModule.forRoot()
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
