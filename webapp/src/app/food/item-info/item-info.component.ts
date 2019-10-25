import { Component, OnInit, Input } from '@angular/core';
import { Food } from '../food.model';
import { AuthenticateService } from 'src/app/site/authenticate.service';

@Component({
  selector: 'app-food-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {
  @Input() food:Food[];
  constructor(private authService:AuthenticateService) { }

  ngOnInit() {
  }
  
  isAdmin(){
    return this.authService.loggedIn && this.authService.isAdminUser();
  }

}
