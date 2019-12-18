import { Injectable } from '@angular/core';
import { Stomp, CompatClient, StompHeaders, StompSubscription } from '@stomp/stompjs';
import * as sockjs from 'sockjs-client';
import { Bid } from '../interfaces/bid';
import { CommunicatorService } from './communicator.service';
import { environment } from 'src/environments/environment';
import { LoggerService } from './logger.service';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: any;
  public stompClient: CompatClient;
  private wantedDisconnection = false;

  public storedSubcriptions = connectMessage => {};

  private socketReconnect = (isReconnect = true) => {
    this.socket = new sockjs(environment.wsURL);
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.debug = msg => this.logger.log(msg);
    this.stompClient.heartbeatIncoming = 5000;
    this.stompClient.heartbeatOutgoing = 5000;
    this.stompClient.onWebSocketClose = () => {
      this.logger.log('rip');
      if (!this.wantedDisconnection) {
        setTimeout(this.socketReconnect, 5000);
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
    this.wantedDisconnection = false;
    this.storedSubcriptions = connectCb;
    this.stompClient.connect({}, connectCb);
  }

  sendBid(bid: Bid) {
    if (!this.stompClient.connected) {
      throw new Error('connection not yet open');
    }

    this.stompClient.send('/bids.addbid', {}, JSON.stringify(bid));
  }

  getBidScore(bid: Bid) {
    if (!this.stompClient.connected) {
      throw new Error('connection not yet open');
    }

    this.stompClient.send('/bids.getscore', {}, JSON.stringify(bid));
  }

  fetchBids() {
    if (!this.stompClient.connected) {
      throw new Error('connection not yet open');
    }

    this.stompClient.send('/bids.fetchbid', {}, 'fetch');
  }

  disconnect() {
    this.wantedDisconnection = true;
    if (this.stompClient.connected) {
      this.stompClient.disconnect();
    }
  }

  subscribe(topic: string, dest: string, key: string, auth: string): StompSubscription {
    if (!this.stompClient.connected) {
      throw new Error('connection not yet open');
    }
    const stompHeaders = {
      auth
    };
    return this.stompClient.subscribe(topic, message => {
      this.comms.postMessage(this, dest, {[key]: message});
    },
    stompHeaders);
    // return this.comms.getMessages();
  }
}
