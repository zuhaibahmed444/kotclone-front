import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
user;
users;
  constructor(private router: Router,private paymentservice : PaymentServiceService,private login :LoginService) { }

  ngOnInit(): void {
    this.paymentservice.setsubscribe().subscribe(
      (data:any)=>{
          this.user = data
          console.log(data)
          Swal.fire('Successfully Subscribed', 'Subscription sucessfull'+ data.subscribed , 'success'); 
      }
      );
      this.login.updateUser();
      this.router.navigate(['user-dashboard/0']);
      
  

  }

}
