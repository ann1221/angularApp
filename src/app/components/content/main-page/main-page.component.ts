import { Component, OnInit } from '@angular/core';

export interface SetMSH {
  title: string;
  rowspan: number;
  colspan: number;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  pathToMainImg: string;
  counter = 2;

  topImg: string[] = ['top1.jpg', 'top2.jpg', 'top3.jpg', 'top4.jpg', 'top5.jpg', 'top6.jpg'];

  startOfPathToImgs = '../../../assets/mainPage/';
  Sq: string[] = ['Sq1.jpg', 'Sq2.jpg', 'Sq3.jpg', 'Sq4.jpg', 'Sq5.jpg', 'Sq6.jpg'];
  SqDescr: string[] = ['Description1', 'Description2', 'Description3', 'Description4', 'Description5', 'Description6'];

  Wedd: string[] = ['wedd1.jpg', 'wedd2.jpg', 'wedd3.jpg', 'wedd4.jpg', 'wedd5.jpg', 'wedd6.jpg'];

  MakeSomHap: SetMSH[] =
    [
      {title: 'MakeSomHap1.jpg', rowspan: 2, colspan: 1},
      {title: 'MakeSomHap2.jpg', rowspan: 1, colspan: 1},
      {title: 'MakeSomHap3.jpg', rowspan: 1, colspan: 2},
      {title: 'MakeSomHap4.jpg', rowspan: 1, colspan: 2},
      {title: 'MakeSomHap5.jpg', rowspan: 1, colspan: 1}
    ];


  constructor() { }

  ngOnInit() {
    this.pathToMainImg = '../../../assets/mainPage/MainFont1.jpg';
  }
  OnClick() {
    if (this.counter > 3) {
      this.counter = 1;
    }
    this.pathToMainImg = '../../../assets/mainPage/MainFont' + this.counter + '.jpg';
    console.log(this.pathToMainImg);
    this.counter += 1;
  }
}

