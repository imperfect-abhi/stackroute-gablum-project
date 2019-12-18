import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';

export interface PeriodicElement {
  name: string;
  rank: number;
  bids: number;
  xfactor: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {rank: 1, name: 'Anurag', bids: 1.0079, xfactor: 'H'},
  {rank: 2, name: 'anonon', bids: 4.0026, xfactor: 'He'},
  {rank: 3, name: 's1mple', bids: 6.941, xfactor: 'Li'},
  {rank: 4, name: 'nadeking', bids: 9.0122, xfactor: 'Be'},
  {rank: 5, name: 'Boron', bids: 10.811, xfactor: 'B'},
  {rank: 6, name: 'darksave', bids: 12.0107, xfactor: 'C'},
  {rank: 7, name: 'docdisrespec', bids: 14.0067, xfactor: 'N'},
  {rank: 8, name: 'oxygen', bids: 15.9994, xfactor: 'O'},
  {rank: 9, name: 'hhellbringer', bids: 18.9984, xfactor: 'F'},
  {rank: 10, name: 'nani', bids: 20.1797, xfactor: 'Ne'},
];
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  showPortal = false;
  displayedColumns: string[] = ['rank', 'name', 'bids', 'xfactor'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor() {
     }

}
