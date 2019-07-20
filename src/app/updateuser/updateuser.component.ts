
import { Input, Component, Output, EventEmitter , OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, RegistrationService } from '../../app/_services';
import { first } from 'rxjs/operators';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  constructor(	private route: ActivatedRoute,
   		private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService) { }

  ngOnInit() {
  }

}
