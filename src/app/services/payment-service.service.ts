import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private http: HttpClient) {}

  public generatePayment(amount :any) {
    return this.http.post(`${baseUrl}/payment/`,amount);
  }

  public setsubscribe(){
    return this.http.get(`${baseUrl}/user/setsubcribed`)
  }


}
