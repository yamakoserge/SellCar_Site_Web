import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-bids',
  templateUrl: './manage-bids.component.html',
  styleUrl: './manage-bids.component.scss'
})
export class ManageBidsComponent {
  cardId:number=this.activatedRoute.snapshot.params['id'];
  bids: any;
  isSpinning: boolean = false;

  constructor(
    private service: CustomerService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getMyBids();
  }

  getMyBids() {
    this.isSpinning = true;
    this.service.getBidsByCarId(this.cardId).subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.bids = res;
    });
  }

  changeBookingStatus(id: number, status: string) {
    this.isSpinning = true;
    this.service.updateBidStatus(id, status).subscribe(
      (res) => {
        this.isSpinning = false;
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
