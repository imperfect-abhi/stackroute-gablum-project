import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  public heros = ['ANaN_YO', 'VEERU_PA', 'PRATS99', 'CAPTAIN', 'ABHI', 'SCAM_MASTER', 'SU_DHIN_DHRAA', 'SWARTHY_PARTH'];

  constructor() {
   }

  ngOnInit() {
  }

}
