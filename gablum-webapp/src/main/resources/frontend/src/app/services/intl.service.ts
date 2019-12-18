import { Injectable } from '@angular/core';
import { CommunicatorService } from './communicator.service';

@Injectable({
  providedIn: 'root'
})
export class IntlService {

  private lang: string;

  constructor(
    private comms: CommunicatorService
  ) { }

  getLang() {
    return this.lang;
  }

  setLang(lang: string) {
    this.lang = lang;
    this.langChanged();
  }

  langChanged() {
    this.comms.postMessage(
      this, '@all', {langChanged: ''}
    );
  }
}
