import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService } from '../../app/_services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 username: string;
 returnUrl: string;
 navename:string;
  constructor(private authenticationService: AuthenticationService,
  				private route: ActivatedRoute,
  				private router: Router,
        private alertService: AlertService) { }

  ngOnInit() {
   this.username=localStorage.getItem("username");
   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  logout(){
  	 this.authenticationService.logout();
  	 this.router.navigate([this.returnUrl]);
  }
  navfunction(navename){
  	this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || navename;
  	this.router.navigate([this.returnUrl]);
  }
}
