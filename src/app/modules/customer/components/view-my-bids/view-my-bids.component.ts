import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-my-bids',
  templateUrl: './view-my-bids.component.html',
  styleUrls: ['./view-my-bids.component.scss',]
})
export class ViewMyBidsComponent {
  bids: any;
  isSpinning: boolean = false;


  constructor(private service: CustomerService,
  private message: NzMessageService) {}

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

  changeBookingStatus(id:number, status:string){
  this.isSpinning=true;
    this.service.updateBidStatus(id, status).subscribe(
      (res) => {
        this.isSpinning=false;
        this.message.success('Bid status changed successfully', {
          nzDuration: 3000,
        });
        this.getMyBids();
      },
      (error) => {
        this.message.error('Something went wrong', { nzDuration: 3000 });
      }
    );
  }
  
}
