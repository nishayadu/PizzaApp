import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
  OrderData,
  OrderDetail,
  OrderStatus,
  OrderStatusFilter,
} from '../Interfaces/order-data';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private allOrderStatus: any = JSON.parse(
    localStorage.getItem('orderList') || '{}'
  );
  constructor(private _httpClient: HttpClient) {}

  public getOrderList(orderStatus: OrderStatusFilter) {
    return this._httpClient.get('assets/order-data.json').pipe(
      map((data: OrderData) => {
        return (
          data
            // change status on each item
            .map((item) => {
              return {
                ...item,
                status: this.allOrderStatus[item.order_id] || item.status,
              };
            })

            .filter((item) => {
              if (orderStatus != 'All') {
                return item.status == orderStatus;
              } else {
                return item;
              }
            })
        );
      })
    );
  }

  public changeOrderStatus(orderDetail: OrderDetail, status: OrderStatus) {
    this.allOrderStatus[orderDetail.order_id] = status;
    localStorage.setItem('allOrderStatus', JSON.stringify(this.allOrderStatus));
  }
}
