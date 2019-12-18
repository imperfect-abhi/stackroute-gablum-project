import { Component, ComponentRef } from '@angular/core';

export interface DashboardSection {
    label: string;
    desc: string;
    icon: string;
    data: Array<any>;
    isActive?: boolean;
}
