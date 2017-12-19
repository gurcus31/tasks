import { NgModule }             from '@angular/core';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';

import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainViewComponent },
  { path: 'task/:id', component: ViewTaskComponent},
];


@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}