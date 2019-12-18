import { TestBed } from '@angular/core/testing';

import { WebsocketService } from './websocket.service';

describe('WebsocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsocketService = TestBed.get(WebsocketService);
    expect(service).toBeTruthy();
  });

  it('should throw error on send before connect', () => {
    const service: WebsocketService = TestBed.get(WebsocketService);
    expect(service.sendBid).toThrow();
  });

  it('should throw error on send before connect', () => {
    const service: WebsocketService = TestBed.get(WebsocketService);
    expect(service.subscribe).toThrow();
  });
});
