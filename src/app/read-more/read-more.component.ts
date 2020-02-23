import { Component, ViewEncapsulation, Input, AfterViewInit, ElementRef } from "@angular/core";

@Component({
  selector: "read-more",
  template: `
        <div [class.collapsed]="isCollapsed" [ngClass]="{'isCollapsed': !isCollapsed}" class="pull-left pt-2 readMore">
            <ng-content></ng-content>
        </div>
        <a (click)="isCollapsed = !isCollapsed" [hidden]="dataLength" class="pt-2 pull-right" style="height:5px">
          <fa-icon icon="chevron-right" *ngIf="isCollapsed"></fa-icon>
          <fa-icon icon="chevron-down" *ngIf="!isCollapsed"></fa-icon>
        </a>
        <div class='cb'></div>
        
    `,
  styleUrls: ["./read-more.component.scss"],
  encapsulation: ViewEncapsulation.None
})

export class ReadMoreComponent {
  @Input() dataLength: boolean;
  public isCollapsed: boolean = true;
  constructor() {}
}
