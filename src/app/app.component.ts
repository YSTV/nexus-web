import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { NewStreamDialogComponent } from './new-stream-dialog/new-stream-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { BackendService } from './backend.service';
import { Stream } from './stream';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  connectionStatus: string = 'Offline';
  streams: Stream[];

  constructor(
    private _dialog: MdDialog,
    private _snackbar: MdSnackBar,
    private backendService: BackendService
  ) {
  }

  ngOnInit(): void {
    this.getStreams();
  }

  private displayError(err: any) {
    this._snackbar.open('Whoops, something went wrong: ' + err, 'Damn');
  }

  getStreams(): void {
    this.backendService.getStreams().then(
      streams => this.streams = streams
    ).catch(err => this.displayError(err));
  }

  deleteStream(stream: Stream) {
    let dialogRef = this._dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe( confirmed => {
      if (confirmed) {
        this.backendService.deleteStream(stream).then( () => {
          this.getStreams(); // TODO: we know it got deleted, maybe do this locally?
          this._snackbar.open('Stream deleted', 'Cool');
        }).catch(err => this.displayError(err));
      }
    });
  }

  openNewStreamDialog() {
    let dialogRef = this._dialog.open(NewStreamDialogComponent);
    dialogRef.afterClosed().subscribe(createdStream => {
      if (createdStream != null) {
        this.streams.push(createdStream);
      }
    });
  }
}


