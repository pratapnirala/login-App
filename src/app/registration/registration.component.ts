import { Input, Component, Output, EventEmitter , OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';

import { AlertService, RegistrationService } from '../../app/_services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
 	message: string;
	registrForm: FormGroup;
 	returnUrl: string;
 	submitted = false;



  constructor(
  		private route: ActivatedRoute,
   		private formBuilder: FormBuilder,
        private router: Router,
        private registrationService: RegistrationService,
        private alertService: AlertService
  ) {
  		if (this.registrationService.currentUserValue) { 
            		this.router.navigate(['/']);
        			}
   }

  ngOnInit() {

  		this.registrForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            address: ['', Validators.required],
            password: ['', Validators.required]
        });
         // get return url from route parameters or default to '/'
        
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/CreateUser';
        


  }

 get f() { return this.registrForm.controls; }
   registr() : void {


   this.submitted = true;

        // stop here if form is invalid
        if (this.registrForm.invalid) {
            return;
        }
   
     this.registrationService.registration(this.f.username.value,this.f.email.value,this.f.address.value, this.f.password.value,'registration')
            .pipe(first())
            .subscribe(
                data => {
                		
                			this.message = data["description"];
                      this.registrForm.reset();
                       //this.registrForm.form.markAsPristine();
                        this.router.navigate([this.returnUrl]);
                    //this.registrForm.form.markAsUntouched();

                    //this.registrForm.reset();
                    //this.registrForm.reset(this.f.email='');
                   //this.registrForm.controls['nameOfControl'].markAsPristine();
                		//  this.registrForm.markAsPristine( );
                    //this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    
                });
   
  }


}
