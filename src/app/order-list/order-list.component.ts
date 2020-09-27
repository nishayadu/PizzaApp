import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import {
  OrderStatus,
  OrderStatusFilter,
  OrderData,
  OrderDetail,
} from '../Interfaces/order-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orderStatus: OrderStatusFilter[] = ['All', 'Received', 'Preparing', 'Ready'];
  orderData: OrderData = [];
  status: OrderStatusFilter = 'All';
  constructor(
    private _orderDataService: OrderService,
    private modalService: NgbModal
  ) {
    this.loadOrderData();
  }

  ngOnInit(): void {
    this.loadOrderData();
  }

// when clicked on OrderId and Customer the Popup will open with detail information of particular orderId, and sending data to detailComponent
  open(event: MouseEvent, order: OrderDetail) {
    event.preventDefault();
    const modalRef = this.modalService.open(OrderDetailComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.orderDetail = order;
  }

// when orderStatus is changed from Dropdown
  changeStatus(status: OrderStatusFilter) {
    this.status = status;
    this.loadOrderData();
  }

// called when Move to next order status
  changeStatustoNext(order: OrderDetail) {
    order.status = this.getNextStatus(order.status);
    this._orderDataService.changeOrderStatus(order, order.status);
  }

// when next status is clicked, changing the text in the button
  getNextStatus(currentStatus: OrderStatus) {
    if (currentStatus === 'Received') return 'Preparing';
    else if (currentStatus === 'Preparing') return 'Ready';
  }

  // to load complete order data
  private loadOrderData() {
    this._orderDataService.getOrderList(this.status).subscribe((data) => {
      this.orderData = data;
    });
  }
}
