import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractRoutingModule } from './contract-routing.module';
import { MaterialModule } from '../material/material.module';
import { ContractCardComponent } from './contract-card/contract-card.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractPageComponent } from './contract-page/contract-page.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    ContractCardComponent,
    ContractDetailComponent,
    ContractPageComponent],
  imports: [
    CommonModule,
    ContractRoutingModule,
    MaterialModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class ContractsModule { }
