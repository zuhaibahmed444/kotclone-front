import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  qid;
  num;
  eachmark;
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

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router,
    private _question: QuestionService,
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    // console.log(this.qid);
    
    this.questions =this._question.getQuestionsOfQuizForTest(this.qid)

    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        // console.log(data);
        this.quiz = data;
      },
      (error) => {
        console.log(error);
        alert('Error in loading quiz data');
      }
    );
    this.num = parseInt(this.quiz.maxMarks)
    this.eachmark = parseInt(this.quiz.maxMarks)/this.questions.length
  }

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',

      showCancelButton: true,
      confirmButtonText: `Start`,
      denyButtonText: `Don't save`,
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.qid]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
