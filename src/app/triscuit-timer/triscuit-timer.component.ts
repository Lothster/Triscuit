import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Quote } from '../quote';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-triscuit-timer',
  templateUrl: './triscuit-timer.component.html',
  styleUrls: ['./triscuit-timer.component.css']
})

export class TriscuitTimerComponent implements OnInit {
  @ViewChild('cdRepTime', { static: false }) private repTimer: CountdownComponent;
  @ViewChild('cdTimeRemaining', { static: false }) private TimeRemaining: CountdownComponent;
  @ViewChild('mymodal', { static: false }) private mymodal: NgbModal;
  reps: number;
  reptime: number;
  timeleft: number;
  closeResult: string;
  quoteString: string;
  quotes: Quote[];
  constructor(private modalService: NgbModal, private quoteService: QuoteService) { }

  ngOnInit() {
    this.reps = this.randomInt(1, 11);
    this.reptime = this.randomInt(20, 60);
    this.timeleft = this.reps * this.reptime - this.reps + 1;
  }

  ngAfterViewInit(){
    //console.log('ngAfterViewInit');
  }

  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handleNextRep(event): void {
    if (event.action === 'done') {
      //get quote from service 
      this.quoteService.getQuotes().subscribe(quotes => this.quotes = quotes);
      //TODO: Make this a function on the service.
      this.quoteString = this.quotes[Math.floor(Math.random() * this.quotes.length)].content;
      //display modal
      this.open(this.mymodal);
    }
    if (this.reps > 0) {
      if (event.action === 'notify') { 
        this.reps = this.reps - 1;
        if(this.reps != 0){
          this.repTimer.config.demand = false;
          this.repTimer.restart();
        } 
      }
    }
  }

  open(content: NgbModal) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'modal-holder'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
