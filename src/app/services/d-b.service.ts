import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Bouquet} from '../classes/Bouquet';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DBService {
  baseURL = 'http://localhost:8080';
  mainURL = this.baseURL + '/main';
  userURL = this.baseURL + '/user';

  constructor(public cookieService: CookieService,
              public http: HttpClient,
              private snackBar: MatSnackBar) {
  }

  public GetBouquetById(bouquetId: number): Observable<Bouquet> {
    return this.http.get<Bouquet>(this.mainURL + '/bouquets/' + bouquetId);
  }

  public getCatalogByIds(ids: number[]): Observable<Bouquet[]>{
    const parametrs = new HttpParams().set('bouquetsIdsJson', JSON.stringify(ids));
    return this.http.get<Bouquet[]>(this.mainURL + '/bouquets', {params: parametrs});
  }

  public getCatalogSlice(start: number, capacity: number): Observable<Bouquet[]>{
    return this.http.get<Bouquet[]>(this.mainURL + '/bouquets/' + start + '/' + capacity);
  }

  public getCatalogByProdNameSlice(prodName, start: number, capacity: number): Observable<Bouquet[]> {
    const parametrs = new HttpParams().set('prodName', prodName);
    return this.http.get<Bouquet[]>(this.mainURL + '/bouquets/byProdName/' + start + '/' + capacity , {params: parametrs});
  }

  // public getCatalog(): Observable<Bouquet[]> {
  //   return this.http.get<Bouquet[]>(this.baseURL + '/bouquets');
  // }

  // public getCatalogByProdName(prodName): Observable<Bouquet[]> {
  //   const parametrs = new HttpParams().set('prodName', prodName);
  //   return this.http.get<Bouquet[]>(this.baseURL + '/bouquets/byProdName/' , {params: parametrs});
  // }

  public addClientOrder(heads, body, parametrs){
    return this.http.post(this.mainURL + '/orders/new', body,
      {headers: heads, params: parametrs});
  }

  public signUp(heads, body) {
    return this.http.post(this.mainURL + '/registration', body, {headers: heads});
  }

  public signIn(heads) {
    return this.http.get(this.userURL + '/validate', {headers: heads});
  }

  public signOut(heads){
    return this.http.get(this.userURL + '/logout', {headers: heads});
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
    });
  }
  public sendEmail(email: string){
    const parametrs = new HttpParams().set('email', email);
    return this.http.get<number>(`http://localhost:8080/main/` + `sendSimpleEmailParam`, {params: parametrs});
  }

  public Comment(fname: string, sname: string, commentText: string){
    const parametrs = new HttpParams()
      .set('fname', fname)
      .set('sname', sname)
      .set('commentText', commentText);
    return this.http.get<number>(`http://localhost:8080/main/` + `comment`, {params: parametrs});
  }
}

