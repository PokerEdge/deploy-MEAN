import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getIssues() {
    return this.http.get(`${this.uri}/issues`);
  }

  getIssueById(id: Number) {
    return this.http.get(`${this.uri}/issues/${id}`);
  }

  addIssue(title: String, responsible: String, description: String, severity: String) {
    const issue = {
      title,
      responsible,
      description,
      severity
    };
    return this.http.post(`${this.uri}/issues/add`, issue);
  }

  updateIssue(id: Number, title: String, responsible: String, description: String, severity: String, status: String) {
    const issue = {
      id,
      title,
      responsible,
      description,
      severity,
      status
    };
    return this.http.post(`${this.uri}/issues/update/${id}`, issue);
  }

  deleteIssue(id: Number) {
    return this.http.get(`${this.uri}/issues/delete/${id}`);
  }
}
