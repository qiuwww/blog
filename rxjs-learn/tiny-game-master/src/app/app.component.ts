import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { BreakoutCanvasService } from './service/breakout-canvas.service';
import { BreakoutService } from './service/breakout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'tiny-game';

  @ViewChild('stage') // ref，获取对元素的操作
  stage: ElementRef;

  constructor(
    public canvasService: BreakoutCanvasService,
    public breakoutService: BreakoutService
  ) { }


  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const stageCanvas = this.stage.nativeElement;
    this.canvasService.init(stageCanvas);
    this.breakoutService.ready();
  }
}
