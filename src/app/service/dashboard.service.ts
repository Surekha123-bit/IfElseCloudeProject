import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Balance } from '../IfElse';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  
  public getAll(): Observable<Balance[]> {
    return this.httpClient.get<Balance[]>('https://1.api.fy23ey06.careers.ifelsecloud.com/');
  }
}
