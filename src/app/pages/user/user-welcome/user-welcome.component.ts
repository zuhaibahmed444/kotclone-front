import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.css'],
})
export class UserWelcomeComponent implements OnInit {
  quizzes;
  quizey;
  msg ;
  myres;
  user;

  constructor( private _quiz: QuizService,private login :LoginService,
    private paymentservice : PaymentServiceService,private router: Router) { }

  ngOnInit(): void {
    this._quiz.getActiveQuizzes().subscribe(
      (data:any)=>{
        this.quizzes = data
        console.log(this.quizzes[0])
        console.log(this.quizzes.length)

      }
      );

  }



  


  OnClik(){
      this.generatePayment();
  }



  public generatePayment(){
    console.log("Payment started");
    let amont = '99'
    let redirect_url
     this.paymentservice.generatePayment(amont).subscribe((data:any)=>{
        this.msg = (data)
        console.log(this.msg)
        console.log(this.msg.id);
        if(this.msg.status = "created"){
          console.log("YESSSSS")
          let options={
            key:'rzp_test_wkav2Zig8NcfbX',
            amount: this.msg.amount,
            currency :'INR',
            name :'Exam Portal',
            description :'Subscription Fee',
            callback_url:'http://localhost:4200/success',
            image :'https://images.thequint.com/thequint%2F2021-08%2Fe4401666-0261-4777-90d1-3fc3334fdd98%2Fimgonline_com_ua_resize_dHAZfXbnjKQdBizI.jpg',
            order_id : this.msg.id,
            handler:function(response){
                console.log(response.razorpay_payment_id);
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_signature);
                console.log("Payment SucessFUll");
                Swal.fire('Successfully done !!', 'PaymentSuccess' , 'success');
                if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
                  redirect_url ='http://localhost:4200/userwelcome'
                } else {
                    redirect_url='http://localhost:4200/success'
                }
                location.href = redirect_url;
                
                
                          
              },
            
            
            notes:{
              address:"ZakLearn Ventures"
            }
        }
      let rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){ 
        console.log(response.error.code); 
        console.log(response.error.description); 
        console.log(response.error.source); 
        console.log(response.error.step); 
        console.log(response.error.reason); 
        console.log(response.error.metadata.order_id); 
        console.log(response.error.metadata.payment_id); 
        alert("OPS Payment Failed")
       });

       
       rzp.open();
       }
  },(error) => {
      //
      console.log(error);
    }

    );



  }

  public setsubcribed(){
    this.paymentservice.setsubscribe().subscribe(
      (data:any)=>{
          this.user = data
          console.log(data)
          Swal.fire('Successfully Subscribed', 'Subscription sucessfull'+ data.subscribed , 'success'); 
      }
      );
      this.router.navigate(['user-dashboard/0']);
  }

  

  }

  













