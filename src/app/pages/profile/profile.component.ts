import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user = null;
  sub ;
  constructor(private login: LoginService,private router: Router) {}

  ngOnInit(): void {
    this.user = this.login.getUser();
    if(this.user.subscribed){
      this.sub = "LIFETIME MEMBERSHIP"
    }
    // this.login.getCurrentUser().subscribe(
    //   (user: any) => {
    //     this.user = user;
    //   },
    //   (error) => {
    //     alert('error');
    //   }
    // );
  }
  public backto(){
    if (this.login.getUserRole() == 'ADMIN') {
      
      this.router.navigate(['admin']);
      
    } else if (this.login.getUserRole() == 'NORMAL') {
      
      this.router.navigate(['user-dashboard/0']);
      
    }

  }
}
