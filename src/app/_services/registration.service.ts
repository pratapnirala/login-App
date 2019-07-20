import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../../app/_models';



@Injectable({ providedIn: 'root' })
export class RegistrationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    registration(username: string,email: string,address: string, password: string, type:string) {
       // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
       let headers: any = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            headers.append('Cache-Control','no-cache');
       return this.http.post<any>(`${environment.apiUrl}`, { type,username,email,address, password,headers })
            .pipe(map(user => {
                
                if (user && user.token) {
                  
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    


    
}