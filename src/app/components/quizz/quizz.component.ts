import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
    selector: 'app-quizz',
    standalone: true,
    imports: [],
    templateUrl: './quizz.component.html',
    styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {

    title: string = '';

    questions: any;
    questionSelected: any;

    answers: string[] = [];
    answersSelected: string = '';

    questionIndex: number = 0;
    questionMaxIndex: number = 0;

    finished: boolean = false;

    ngOnInit(): void {
        if (quizz_questions) {
            this.finished = false;
            this.title = quizz_questions.title;

            this.questions = quizz_questions.questions;
            this.questionSelected = this.questions[this.questionIndex];

            this.questionIndex = 0;
            this.questionMaxIndex = this.questions.length;
        }
    }

    playerChoose(value: string) {
        this.answers.push(value);
        this.nextStep()
    }

    async nextStep() {
        this.questionIndex += 1;

        if (this.questionMaxIndex > this.questionIndex) {
            this.questionSelected = this.questions[this.questionIndex]
        } else {
            const finalAnswer: string = await this.chackResult(this.answers);
            this.finished = true;
            this.answersSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
        }
    }

    async chackResult(anwsers: string[]) {
        const result = anwsers.reduce((previous, current, index, array) => {
            if (
                array.filter(item => item === previous).length >
                array.filter(item => item === current).length
            ) {
                return previous
            } else {
                return current
            }
        })

        return result
    }

}
