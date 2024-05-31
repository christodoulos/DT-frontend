import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MapService } from '../../shared/services/map.service';
import { ApnService } from '../../shared/services/apn.service';
import { IAPNPLC } from '../../shared/interfaces/APNPLC';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef } from 'ag-grid-community';
import { ConstService } from '../../shared/services/const.service';
import { Popup } from 'mapbox-gl';

function compareTimestamps(a: any, b: any): number {
    return b.ts.$date - a.ts.$date;
}

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

    map = this.mapService.map;

    lastPlcRecords: IAPNPLC[] = [];
    defaultColDef: any;
    colDefs: ColDef[] = [];
    gridApi: GridApi<IAPNPLC>;

    showPLCTable = false;

    popup = new Popup({
        closeButton: false,
        closeOnClick: false,
        maxWidth: '500px',
    });

    ngOnInit() {
        this.defaultColDef = this.constService.defaultColDef;
        this.colDefs = this.constService.APNPLC_COL_DEFS;

        this.mapService.setLocation('athens-plant-nursery');
        this.apnService.getPlcRecords(5).subscribe((records) => {
            records.sort(compareTimestamps);
            console.log(records);
            this.lastPlcRecords = records;
        });

        this.mapService.apnPLCModelClicked.subscribe((plcId: string) => {
            console.log('PLC model clicked:', plcId);
            this.showPLCTable = !this.showPLCTable;
        });
    }

    ngOnDestroy() {
        this.mapService.leaveLocation('athens-plant-nursery');
    }
}
