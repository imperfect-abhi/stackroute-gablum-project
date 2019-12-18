import { Injectable } from '@angular/core';
import * as sockjs from 'sockjs-client';
import { Stomp, CompatClient, StompHeaders, StompSubscription } from '@stomp/stompjs';
import { environment } from '../../environments/environment';
import { CommunicatorService } from './communicator.service';
import { LoggerService } from './logger.service';


@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {
  private socket: any;
  public stompClient: CompatClient;
  private wantedDisconnection = false;

  public storedSubcriptions = connectMessage => {};

  private socketReconnect = (isReconnect = true) => {
    this.socket = new sockjs(environment.alertURL);
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.debug = msg => this.logger.log(msg);
    this.stompClient.heartbeatIncoming = 5000;
    this.stompClient.heartbeatOutgoing = 5000;
    this.stompClient.onWebSocketClose = () => {
      this.logger.log('rip');
      if (!this.wantedDisconnection) {
        setTimeout(this.socketReconnect, 30000);
      }
    };
    if (isReconnect) {
      this.stompClient.connect({}, this.storedSubcriptions);
    }
  }

  constructor(
    private comms: CommunicatorService,
    private logger: LoggerService) {
    this.socketReconnect(false);
  }
  connect(connectCb = connectMessage => { this.logger.log(connectMessage); }) {
    this.logger.log('connect called on alert');
    this.wantedDisconnection = false;
    this.storedSubcriptions = connectCb;
    this.stompClient.connect({}, connectCb);
  }
  disconnect() {
    this.wantedDisconnection = true;
    if (this.stompClient.connected) {
      this.stompClient.disconnect();
    }
  }

  subscribe(topic: string, dest: string, key: string): StompSubscription {
    if (!this.stompClient.connected) {
      throw new Error('connection not yet open');
    }
    return this.stompClient.subscribe(topic, message => {
      this.comms.postMessage(this, dest, {[key]: message});
    });
  }
}
