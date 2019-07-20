import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../../app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string, type:string) {
       // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
       let headers: any = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            headers.append('Cache-Control','no-cache');
       return this.http.post<any>(`${environment.apiUrl}`, {  type,username, password,headers })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }


    dashbordgetdata(){
             let headers: any = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            headers.append('Cache-Control','no-cache');
       return this.http.get<any>(`http://112.196.109.66:8170/api/v1/astrixdispatcher/campaign/all`, {headers})
            .pipe(map(dashbord => {
                // dashbord successful if there's a jwt token in the response
                if (dashbord && dashbord.token) {
                    // store dashbord details and jwt token in local storage to keep on dashbord
                    localStorage.setItem('currentDashbord', JSON.stringify(dashbord));
                    this.currentUserSubject.next(dashbord);
                }

                return dashbord;
            }));
    }
}