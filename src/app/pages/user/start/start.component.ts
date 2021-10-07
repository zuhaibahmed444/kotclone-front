import { LocationStrategy } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit,ElementRef, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  qid;
  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestion: '',
    isActive: true,
    category: {
      cid: '',
    },
  };
  questions;
  user = null;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;

  timer: any;

  @ViewChild('pdf')
  pdfTable!: ElementRef;



  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz: QuizService,
    public login: LoginService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
    this.user = this.login.getUser();
    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
      }
    );

  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        this.startTimer();
      },

      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }
  


  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    // calculation
    // call to sever  to check questions
    // this._question.evalQuiz(this.questions).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
    //     this.correctAnswers = data.correctAnswers;
    //     this.attempted = data.attempted;
    //     this.isSubmit = true;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    this.isSubmit = true;
    this.questions.forEach((q) => {
      if (q.givenAnswer == q.answer) {
        this.correctAnswers++;
        let marksSingle =
          parseInt(this.quiz.maxMarks) / this.questions.length;
        this.marksGot += marksSingle;
      }
      if (q.givenAnswer.trim() != '') {
        this.attempted++;
      }
    });
    console.log('number od questions:')
    console.log('Correct Answers :' + this.correctAnswers);
    console.log('Marks Got ' + this.marksGot);
    console.log('attempted ' + this.attempted);
    console.log(this.questions);
  }
  printPage(){
        const x = window.print();
        console.log(x);
    
  }
  
}
