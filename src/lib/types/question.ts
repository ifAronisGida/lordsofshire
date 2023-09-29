export interface Question {
  question: string;
  answers: QuestionAnswer[];
  answer: string;
}

export interface QuestionAnswer {
  id: string;
  value: string;
}


export function isQuestion(object: any): object is Question {
  return 'question' in object && 'answers' in object && 'answer' in object;
}
