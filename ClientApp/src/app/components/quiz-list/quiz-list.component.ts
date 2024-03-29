import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { inject } from '@angular/core/testing';
import { Router } from "@angular/router"; 

@Component({
  selector: 'quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  @Input() class: string;
  title: string;
  selectedQuiz: Quiz;
  quizzes: Quiz[];

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router) {

    this.http = http;
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.title = "Latest Quizzes";
    var url = this.baseUrl + "api/quiz/";

    switch (this.class) {
      case "latest":
      default:
        this.title = "Latest Quizzes";
        url += "latest/";
        break;
      case "byTitle":
        this.title = "Quiz by Title";
        url += "bytitle/"
        break;
      case "random":
        this.title = "Random Quizzes";
        url += "random/"
        break;
    }

    this.http.get<Quiz[]>(url).subscribe(result => {
      this.quizzes = result;
    }, error => console.error(error));
  }


  onSelect(quiz: Quiz) {
    this.selectedQuiz = quiz;
    console.log("quiz with Id " + this.selectedQuiz.Id + " has been selected.");
    this.router.navigate(["quiz", this.selectedQuiz.Id]);
  }

}
