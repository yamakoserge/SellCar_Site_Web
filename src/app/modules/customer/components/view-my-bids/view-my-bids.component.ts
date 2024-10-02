import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-my-bids',
  templateUrl: './view-my-bids.component.html',
  styleUrls: ['./view-my-bids.component.scss',]
})
export class ViewMyBidsComponent {
  bids: any;
  isSpinning: boolean = false;


  constructor(private service: CustomerService) {}

  ngOnInit() {
    this.getMyBids();
  }

  getMyBids() {
    this.isSpinning = true;
    this.service.getMyBids().subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.bids = res;
    });
  }
}
