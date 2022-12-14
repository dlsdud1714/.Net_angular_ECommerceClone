import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl: string = environment.apiUrl;
  validationErrors: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }
  get500Error() {
    return this.http.get(this.baseUrl + "/buggy/servererror").subscribe(res =>
      console.log("response", res),
      err => console.log("error", err))
  }
  get404Error() {
    return this.http.get(this.baseUrl + "/buggy/42").subscribe(res =>
      console.log("response", res),
      err => console.log("error", err))
  }
  get400Error() {
    return this.http.get(this.baseUrl + "/buggy/badRequest").subscribe(res =>
      console.log("response", res),
      err => console.log("error", err))
  }
  get400ValidationError() {
    return this.http.get(this.baseUrl + "/products/five").subscribe(res =>
      console.log("response", res),
      err => {
        console.log("error", err);
        this.validationErrors = err.error.errors;
      });
  }

}
