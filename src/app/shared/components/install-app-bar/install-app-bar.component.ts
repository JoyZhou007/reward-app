import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-install-app-bar',
  templateUrl: './install-app-bar.component.html',
  styleUrls: ['./install-app-bar.component.scss']
})
export class InstallAppBarComponent implements OnInit {

  @Input() btnText: string;

  constructor(public userService:UserService) {
  }

  ngOnInit() {
  }

}
