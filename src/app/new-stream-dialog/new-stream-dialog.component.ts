import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Stream } from '../stream';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-new-stream-dialog',
  templateUrl: './new-stream-dialog.component.html',
  styleUrls: ['./new-stream-dialog.component.css']
})
export class NewStreamDialogComponent {
  stream: Stream;

  constructor(
    public dialogRef: MdDialogRef<NewStreamDialogComponent>,
    private backendService: BackendService,
  ) {
    this.stream = new Stream();
  }

  createStream() {
    this.backendService.createStream(this.stream)
      .then(createdStream => this.dialogRef.close(createdStream as Stream));
  }
}
