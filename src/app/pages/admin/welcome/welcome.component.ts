import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  count = 0
  catCount = 0
  quCount = 0

  constructor(private login: LoginService,) { }

  ngOnInit(): void {
    this.login.getCount().subscribe(
      (data:any)=>{
        this.count = data;
        console.log(data)
      }
    );

    this.login.getCatCount().subscribe(
      (data:any)=>{
        this.catCount =data
      }
    );

    this.login.getQuCount().subscribe(
      (data:any)=>{
        this.quCount =data
      }
    );
    

  

  }

}
