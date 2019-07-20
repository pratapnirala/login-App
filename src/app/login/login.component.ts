
import { Router, ActivatedRoute } from '@angular/router';
import { Input, Component, Output, EventEmitter , OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../../app/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	 message: string;
	loginForm: FormGroup;
 	returnUrl: string;
 	submitted = false;
  constructor( 
  		private route: ActivatedRoute,
   		private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { 
        	// redirect to home if already logged in
        		if (this.authenticationService.currentUserValue) { 
            		this.router.navigate(['/']);
        			}
        }


  ngOnInit() {

  		this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
         // get return url from route parameters or default to '/'
         this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Dashboard';
        if(localStorage.getItem("isLoggedIn")=='true' && localStorage.getItem("username")) {
        
        //this.router.navigate([this.returnUrl]);
        }
        
  }
  get f() { return this.loginForm.controls; }
   login() : void {


   this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
   
     this.authenticationService.login(this.f.username.value, this.f.password.value,'login')
            .pipe(first())
            .subscribe(
                data => {
                	if(data["status"]=="Success"){
                		
                		localStorage.setItem('isLoggedIn', "true");
        				localStorage.setItem('emailid', data["profile"]["email"]);
        				localStorage.setItem('username', data["profile"]["username"]);
                localStorage.setItem('id', data["profile"]["id"]);
                 localStorage.setItem('active', data["profile"]["active"]);
                localStorage.setItem('clientid', data["profile"]["clientid"]);
        				this.router.navigate([this.returnUrl]);
                	}else{
                		 this.message = data["description"];
                	}
                    
                },
                error => {
                    this.alertService.error(error);
                    
                });
   
  }

}
