import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/order-list', pathMatch: 'full' },
  {
    path: 'order-list',
    component: OrderListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
