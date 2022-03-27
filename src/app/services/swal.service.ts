import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  public ShowMessage(config: SweetAlertOptions) {
    Swal.fire(config);
  }

  public ShowError(title: string, msg: string) {
    let config: SweetAlertOptions = {
      title: title,
      text: msg,
      icon: 'error',
      confirmButtonText: 'Chiudi',
      confirmButtonColor: '#FB8122'
    };

    Swal.fire(config);
  }

  public ShowWarning(title: string, msg: string) {
    let config: SweetAlertOptions = {
      title: title,
      text: msg,
      icon: 'warning',
      confirmButtonText: 'Chiudi',
      confirmButtonColor: '#FB8122'
    };

    Swal.fire(config);
  }
}
