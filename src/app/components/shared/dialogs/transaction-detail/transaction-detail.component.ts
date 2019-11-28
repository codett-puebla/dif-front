import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})

export class TransactionDetailComponent implements OnInit {

  displayedColumns: string[] = ['No', 'item', 'quantity', 'warehouse'];

  constructor(
      public dialogRef: MatDialogRef<TransactionDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public entryDetail: any
  ) {}
  dataSource: any[];

  ngOnInit(): void {
    this.dataSource = this.entryDetail;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
