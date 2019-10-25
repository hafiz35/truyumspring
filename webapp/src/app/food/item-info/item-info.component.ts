import { Component, OnInit, Input } from '@angular/core';
import { Food } from '../food.model';

@Component({
  selector: 'app-food-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {
  @Input() food:Food[];
  constructor() { }

  ngOnInit() {
  }

}
