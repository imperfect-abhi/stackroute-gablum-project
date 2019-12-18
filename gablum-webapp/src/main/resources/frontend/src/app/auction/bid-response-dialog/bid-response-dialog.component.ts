import { Component, Inject } from '@angular/core';

import {
  MAT_DIALOG_DATA, MatDialogRef
} from '@angular/material/dialog';

@Component({
  selector: 'app-bid-response-dialog',
  templateUrl: './bid-response-dialog.component.html',
  styleUrls: ['./bid-response-dialog.component.css']
})
export class BidResponseDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<BidResponseDialogComponent>) { }

              close() {
                this.dialogRef.close();
              }

}
