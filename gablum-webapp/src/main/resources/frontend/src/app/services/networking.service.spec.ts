import { TestBed } from '@angular/core/testing';

import { NetworkingService } from './networking.service';
import { async } from 'q';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommunicatorService } from './communicator.service';
import { AdvertisedAuction } from '../interfaces/adv-auction';

describe('NetworkingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                CommunicatorService
            ]
        });
    });

    it('should be created', () => {
        const service: NetworkingService = TestBed.get(NetworkingService);
        expect(service).toBeTruthy();
    });

    it('should be able to GET', () => {
        const networking: NetworkingService = TestBed.get(NetworkingService);
        const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
        const communicator: CommunicatorService = TestBed.get(CommunicatorService);
        expect(communicator).toBeTruthy();
        expect(httpMock).toBeTruthy();

        const messageData = {data: 'some_data'};

        networking.getData<AdvertisedAuction>('http://host/advs', 'dest', 'key');

        communicator.getMessages().subscribe((msg) => {
            if (msg.dest === '') {
                return;
            }
            expect(msg.dest).toBe('dest');
            expect(msg.data.key).toBe(messageData);
        });

        const req = httpMock.expectOne('http://host/advs');
        expect(req).toBeTruthy();
        expect(req.request.method).toEqual('GET');
        req.flush(messageData);
    });

    it('should be able to POST', () => {
        const networking: NetworkingService = TestBed.get(NetworkingService);
        const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
        const communicator: CommunicatorService = TestBed.get(CommunicatorService);
        expect(communicator).toBeTruthy();
        expect(httpMock).toBeTruthy();

        const messageData: AdvertisedAuction[] = [
            {
                productName: 'name',
                productImageUrl: 'url'
            }
        ];

        networking.postData<AdvertisedAuction>(
            'http://host/advs', 'dest', JSON.stringify(messageData), 'key'
            );

        communicator.getMessages().subscribe((msg) => {
            if (msg.dest === '') {
                return;
            }
            expect(msg.dest).toBe('dest');
            expect(msg.data.key).toBe(messageData);
        });

        const req = httpMock.expectOne('http://host/advs');
        expect(req).toBeTruthy();
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(JSON.stringify(messageData));
        req.flush(messageData);
    });
});
