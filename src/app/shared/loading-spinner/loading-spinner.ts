import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template:
    '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./loadding_spinner.css'],
})
export class LoadingSpinner {}
