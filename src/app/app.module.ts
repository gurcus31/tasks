import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ViewTaskComponent } from './view-task/view-task.component';

import { TaskService} from './task.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service'

import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { MainViewComponent } from './main-view/main-view.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import {MatTabsModule, MatInputModule, MatIconModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddTaskComponent } from './add-task/add-task.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ViewTaskComponent,
    MessagesComponent,
    MainViewComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, 
    FormsModule, 
    BrowserAnimationsModule,
    MatTabsModule, 
    MatInputModule,
    MatIconModule
  ],
  providers: [TaskService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
