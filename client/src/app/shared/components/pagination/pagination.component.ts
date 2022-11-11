import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() count: number;
  @Input() pageSize: number;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
  onPageChanged($event: any) {
    if ($event.page) {

      this.pageChanged.emit($event.page);
    }
  }

}
