import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string, // agora, this.data pode ser acessado diretamente no template
  ) {}

  onConfirm(result: boolean): void {
    this.dialogRef.close(result); // Quando um diálogo é fechado, ele emite um observable que encapsula result e acessível com subscribe pelo método afterClosed()
  }

  ngOnInit(): void {
  }

}
