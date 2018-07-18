import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {DOWNLOAD_URL} from '../../../reward-home/entity/reward-entity';

@Component({
  selector: 'app-install-app-bar',
  templateUrl: './install-app-bar.component.html',
  styleUrls: ['./install-app-bar.component.scss']
})
export class InstallAppBarComponent implements OnInit {

  @Input() btnText: string;
  public downUrl: string = DOWNLOAD_URL;

  constructor(public userService: UserService) {
  }

  ngOnInit() {
  }

}
