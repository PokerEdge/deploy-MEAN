import { Component, OnInit } from '@angular/core';
import { IssueService } from './../../issue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Issue } from './../../issue';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  currentId: Number;
  issue: any = {};
  updateForm: FormGroup;

  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: '',
      status: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentId = params.id;
      this.issueService.getIssueById(this.currentId).subscribe(res => {
        this.issue = res;
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('responsible').setValue(this.issue.responsible);
        this.updateForm.get('description').setValue(this.issue.description);
        this.updateForm.get('severity').setValue(this.issue.severity);
        this.updateForm.get('status').setValue(this.issue.status);
      });
    });
  }

  updateIssue(title: String, responsible: String, description: String, severity: String, status: String) {
    this.issueService.updateIssue(this.currentId, title, responsible, description, severity, status).subscribe(() => {
      this.snackBar.open(`Issue updated succesfully`, `OK`, {
        duration: 3000
      });
    });
  }
}
