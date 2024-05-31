import { Injectable } from '@angular/core';
import { ILocation } from '../interfaces/location';
import { GeometryType } from '../interfaces/geojson';
import { ColDef, SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from 'ag-grid-community';
import moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class ConstService {
    constructor() {}

    readonly EYDAP_METRICS = {
        date: '15/12/2023',
        cod: '<15',
        bod5: null,
        NNH4: '0.242',
        TSS: null,
        TP: '0.533',
        TN: '3.2',
        NNO3: '2.3',
        pH: '7.71',
        EC: '518',
    };

    readonly WELCOME_PINS = {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: [
                {
                    _id: 'pin-1',
                    id: 'pin-1',
                    type: 'Feature',
                    geometry: {
                        type: GeometryType.Point,
                        coordinates: [23.781372557061157, 37.988260208268386],
                    },
                    properties: {
                        route: 'athens-plant-nursery',
                        title: 'Sewer Mining Technology',
                        description: `<img src="/assets/img/apn.jpg" style="height:100px; float: right;" class="ms-2 mb-2">
            <h6>Athens Plant Nursery</h6>
            <p>Sewer Mining is a treatment plant in a container in which:</p>
            <ul>
              <li>wastewater is extracted from local sewers that run under every location of a city</li>
              <li>treated directly on site in a distributed system</li>
              <li>high quality water is produced (at the point of demand) suitable for irrigation of green areas, groundwater recharge and other urban uses.</li>
            </ul>
            <p>The main idea of this technology is that we use a resource (wastewater) that lies beneath every part of a city to produce clean water and reduce pressures due to water scarcity.</p>
            <p>Sewer Mining technology is a distributed, flexible and autonomous circular economy solution.</p>
            `,
                    },
                },
                {
                    _id: 'pin-2',
                    id: 'pin-2',
                    type: 'Feature',
                    geometry: {
                        type: GeometryType.Point,
                        coordinates: [23.89076532854162, 38.12430221183547],
                    },
                    properties: {
                        route: 'innovations/farmair',
                        title: 'Plant Stress Detection',
                        description: `<img src="/assets/img/farmair-drone.png" style="height:100px; float: right;" class="ms-2 mb-2">
              <h6>farmAIr @Kokkotou Vineyards</h6>
              <p><img src="/assets/img/farmAIr.png" style="float:right;width:100px;" /></p> 
              <p>FarmAIr technology (patented) uses thermal images and Artificial Intelligence to reveal Plant Stress before the onset of any symptom. FarmAIr helps farmers and agronomists spot what they cannot see with the naked eye, be aware, and take all necessary precautions to help prevent any spread. FarmAIr technology is currently available for vineyards, planning to gradually expand to virtually any plant with leaves.</p>`,
                    },
                },
                {
                    _id: 'pin-3',
                    id: 'pin-3',
                    type: 'Feature',
                    geometry: {
                        type: GeometryType.Point,
                        coordinates: [23.73508263685423, 37.87729612062206],
                    },
                    properties: {
                        route: 'analyses/hellinikon',
                        title: 'Flood Risk Analysis',
                        description: `<img src="/assets/img/flood.png" style="height:100px; float: right;" class="ms-2 mb-2">
            <h6>Flood Risk Analysis</h6>
              <p>A hydraulic model plays a significant role in hydrodynamic analysis by simulating how water
                flows within rivers, channels, and floodplains. It acts like a digital river simulator that
                helps engineers and stakeholders understand complex hydrodynamic processes
                without physically being on-site. It considers factors like river shape, slope,
                roughness, and inflow hydrographs to predict how water moves, where it might
                flood, and how fast it will flow during various conditions, such as storms or changes
                in the river's structure and geometry.</p>`,
                    },
                },
                {
                    _id: 'pin-4',
                    id: 'pin-4',
                    type: 'Feature',
                    geometry: {
                        type: GeometryType.Point,
                        coordinates: [23.927596535047954, 37.88231031893016],
                    },
                    properties: {
                        title: 'Advanced Sewer Mining Application',
                        description: `<img src="/assets/img/markopoulo.jpg" style="height:100px; float: right;" class="ms-2 mb-2">
            <h6>Advanced Sewer Mining Application</h6>
            <p>The <em>Advanced Sewer Mining application</em> is essentially a treatment plant in a
            container, which, <strong>at the most energy efficient way</strong>, is able to extract wastewater from
            the local sewers that run under an urban environment, the Municipality of
            Markopoulo, treat it directly on site and produce high quality reused water at the
            point of demand, suitable for irrigation of green areas, groundwater recharge and
            other urban uses.</p>
            <p>
            Through the circular, distributed and flexible Sewer Mining technology, we intent to
            test energy efficiency schemes in order to achieve further reduction of energy needs
            and solve more holistically a more generic problem of all the cities and towns that
            face water scarcity issues due to population growth and urbanisation, the economic
            crisis and of course climate change, leading to a reduction of water availability and
            deterioration of water quality.
            </p>
            `,
                    },
                },
                {
                    _id: 'pin-5',
                    id: 'pin-5',
                    type: 'Feature',
                    geometry: {
                        type: GeometryType.Point,
                        coordinates: [23.911037590576747, 37.9402394070189],
                    },
                    properties: {
                        route: 'innovations/subsol',
                        title: 'Controlled Environment Agriculture solution',
                        description: `<img src="/assets/img/alagro.png" style="height:100px; float: right;" class="ms-2 mb-2">
            <h6>Controlled Environment Agriculture solution</h6>
            <p>
            <em>Controlled Environmental Agriculture (CEA) solutions</em> refer to agricultural
            systems where crops or fruits are cultivated in indoor environments (greenhouses),
            where with the use of the appropriate equipment the crop microclimate is monitored
            and regulated to: </p>
            <ul>
            <li>optimize water and fertilizer efficiency;</li>
            <li>reduce the energy consumption;</li>
            <li>attain similar and if possible better-quality crop parameters.</li>
            </ul>
            <p>In the framework of IMPETUS, we selected the pilot site of the Attica Green
            agricultural enterprise, in a peri-urban area with many environmental constraints
            (high salinity water, close to the airport), in which a series of greenhouses are closely
            monitored in order to increase resources efficiency and in general increase the
            resilience and sustainability of the Attica’s agricultural sector and adjacent natural
            habitats of the region.</p>
            `,
                    },
                },
                {
                    _id: 'pin-6',
                    id: 'pin-6',
                    type: 'Feature',
                    geometry: {
                        type: GeometryType.Point,
                        coordinates: [24.031015046843585, 38.15361073507763],
                    },
                    properties: {
                        title: 'Subsurface Water Solutions',
                        route: 'innovations/subsol',
                        description: `<img src="/assets/img/subsol.jpg" style="height:100px; float: right;" class="ms-2 mb-2">
              <h6>Subsurface Water Solutions</h6>
              <p>Subsurface Water Solutions (SWS) are a novel approach combining management and technology to protect, enlarge and utilize fresh groundwater resources. In Schinias (Marathon), we have tested an SWS configuration coupled with novel pollution remediation techniques, including Reverse Osmosis (RO) and Advanced Oxidation Methods (AOPs) to utilize deeper groundwater resources from karstic coastal aquifers, brackish groundwater treatment and groundwater recharge with infiltration in coastal aquifers to address a widespread problem in the Mediterranean: saltwater intrusion.</p>
              `,
                    },
                },
            ],
            properties: {},
        },
    };

    readonly LOCATIONS: ILocation[] = [
        {
            name: 'farmair',
            center: { lng: 23.8907653285416, lat: 38.1243022118355 },
            zoom: 17,
            bearing: 90,
            pitch: 50,
            glbModels: [],
        },
        {
            name: 'attica',
            center: { lng: 23.70585417391692, lat: 38.01577475657271 },
            zoom: 9.097581678448197,
            pitch: 0,
            bearing: 0,
            glbModels: [],
        },
        {
            name: 'athens-plant-nursery',
            center: { lng: 23.783465732875, lat: 37.9873251405601 },
            zoom: 17,
            pitch: 81,
            bearing: 122,
            glbModels: [
                {
                    id: 'apn-unit',
                    coordinates: { lng: 23.781597756231037, lat: 37.98842485764375 },
                    elevation: 0,
                    fileName: 'apn-unit',
                    scale: { x: 0.125, y: 0.125, z: 0.125 },
                    rotation: { x: 180, y: 90, z: 270 },
                    anchor: 'top-left',
                    tooltip: `
                    <div style="font-family: Roboto; font-weight:normal">
                    <h5>Qualitative Water Analysis (mg/l)</h5>
                    <h6>${this.EYDAP_METRICS.date ?? '-'}</h6>
                    <table class="table table-bordered" style="font-size:smaller">
                        <thead>
                            <tr>
                                <th>COD</th>
                                <th>BOD5</th>
                                <th>NNH4</th>
                                <th>TSS</th>
                                <th>TP</th>
                                <th>TN</th>
                                <th>NNO3</th>
                                <th>pH</th>
                                <th>EC</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${this.EYDAP_METRICS.cod ?? '-'}</td>
                                <td>${this.EYDAP_METRICS.bod5 ?? '-'}</td>
                                <td>${this.EYDAP_METRICS.NNH4 ?? '-'}</td>
                                <td>${this.EYDAP_METRICS.TSS ?? '-'}</td>
                                <td>${this.EYDAP_METRICS.TP ?? '-'}</td>
                                <td>${this.EYDAP_METRICS.TN ?? '-'}</td>
                                <td>${this.EYDAP_METRICS.NNO3 ?? '-'}</td>
                                <td>${this.EYDAP_METRICS.pH ?? '-'}</td>
                                <td>${this.EYDAP_METRICS.EC ?? '-'}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>`,
                    selectable: true,
                },
                {
                    id: 'tree0',
                    coordinates: { lng: 23.7817756050794, lat: 37.9884660930539 },
                    elevation: 0,
                    fileName: 'tree0',
                    scale: { x: 1, y: 1, z: 1 },
                    rotation: { x: 180, y: 90, z: 270 },
                    anchor: 'top-left',
                    tooltip: '',
                    selectable: false,
                },
                {
                    id: 'tree1',
                    coordinates: { lng: 23.7814285202821, lat: 37.9882444002644 },
                    elevation: 0,
                    fileName: 'tree1',
                    scale: { x: 1, y: 1, z: 1 },
                    rotation: { x: 180, y: 90, z: 270 },
                    anchor: 'top-left',
                    tooltip: '',
                    selectable: false,
                },
            ],
        },
        {
            name: 'EMP',
            center: { lng: 23.4, lat: 45.6 },
            zoom: 19,
            bearing: 34.6,
            pitch: 22.4,
            glbModels: [],
        },
    ];

    defaultColDef: ColDef = {
        resizable: true,
        filter: true,
        sortable: true,
        floatingFilter: true,
        suppressMenu: true,
        suppressAutoSize: true,
    };

    APNPLC_COL_DEFS: ColDef[] = [
        {
            field: 'ts',
            headerName: 'Timestamp',
            valueGetter: (params) => moment(params.data.ts.$date).format('DD/MM/YYYY HH:mm'),
        },
        { field: 'col3', headerName: 'Temperature' },
        { field: 'col4', headerName: 'pH' },
        { field: 'col5', headerName: 'DO ppm LDO aeriation' },
        { field: 'col6', headerName: 'DO ppm anoxic' },
        { field: 'col7', headerName: 'MLSS SOLID mg/l' },
        { field: 'col8', headerName: 'MLSS SOLID mg/l' },
        { field: 'col9', headerName: 'LDO DO ppm anoxic' },
        { field: 'col10', headerName: 'Temperature anoxic' },
        { field: 'col11', headerName: 'Turbidity NTU' },
        { field: 'col12', headerName: 'LT1 mm' },
        { field: 'col13', headerName: 'LT2 mm' },
        { field: 'col14', headerName: 'LT3 mm' },
    ];
}
