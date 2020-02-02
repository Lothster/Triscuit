import { Injectable } from '@angular/core';
import { Quote } from './quote.js';
import { QUOTES } from './quote-list'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuoteService {

  constructor() { }

  getQuotes(): Observable<Quote[]>{
    return of(QUOTES);
  }

  getQuote(id: number): Observable<Quote>{
    return of(QUOTES.find(q=> q.id === id));
  }
}
