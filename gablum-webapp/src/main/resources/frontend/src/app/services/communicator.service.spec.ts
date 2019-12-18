import { TestBed } from '@angular/core/testing';

import { CommunicatorService } from './communicator.service';

describe('CommunicatorService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: CommunicatorService = TestBed.get(CommunicatorService);
        expect(service).toBeTruthy();
    });

    it('should be able to communicate', () => {
        const service: CommunicatorService = TestBed.get(CommunicatorService);
        const messageData = {data: 'some_data'};

        service.postMessage(this, 'dest', messageData);
        service.getMessages().subscribe((msg) => {
            expect(msg.data).toEqual(messageData);
        });
    });
});
