import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetail, OrderStatus } from '../Interfaces/order-data';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent {
  @Input() orderDetail: OrderDetail;
  constructor(
    public activeModal: NgbActiveModal,
    private _orderDataService: OrderService
  ) {}

  updateStatus(orderStatus: OrderStatus) {
    this.orderDetail.status = orderStatus;
    this._orderDataService.changeOrderStatus(this.orderDetail, orderStatus);
  }
}
