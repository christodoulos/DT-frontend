import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MapService } from '../../shared/services/map.service';
import { ApnService } from '../../shared/services/apn.service';
import { IAPNPLC } from '../../shared/interfaces/APNPLC';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef } from 'ag-grid-community';
import { ConstService } from '../../shared/services/const.service';

@Component({
    selector: 'app-athens-plant-nursery',
    standalone: true,
    imports: [AgGridAngular],
    templateUrl: './athens-plant-nursery.component.html',
    styleUrl: './athens-plant-nursery.component.css',
})
export class AthensPlantNurseryComponent implements OnInit, OnDestroy {
    mapService = inject(MapService);
    apnService = inject(ApnService);
    constService = inject(ConstService);

    lastPlcRecords: IAPNPLC[] = [];
    defaultColDef: any;
    colDefs: ColDef[] = [];
    gridApi: GridApi<IAPNPLC>;

    ngOnInit() {
        this.defaultColDef = this.constService.defaultColDef;
        this.colDefs = this.constService.APNPLC_COL_DEFS;

        this.mapService.setLocation('athens-plant-nursery');
        this.apnService.getPlcRecords(5).subscribe((records) => {
            this.lastPlcRecords = records;
        });
    }

    ngOnDestroy() {
        this.mapService.leaveLocation('athens-plant-nursery');
    }
}
