import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MapComponent } from './shared/components/map/map.component';
import { MapService } from './shared/services/map.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        MatIconModule,
        MatListModule,
        MatExpansionModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MapComponent,
        FooterComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    breakpointObserver = inject(BreakpointObserver);
    router = inject(Router);
    mapService = inject(MapService);
    route = inject(ActivatedRoute);

    iframe: string = '';

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map((result) => result.matches),
        shareReplay(),
    );

    ngOnInit(): void {
        setTimeout(() => {
            this.route.snapshot.queryParams['iframe'] ? (this.iframe = this.route.snapshot.queryParams['iframe']) : (this.iframe = 'no');
        }, 1000);
    }

    onLogoClick() {
        this.mapService.flyTo('attica');
        this.router.navigate(['']);
    }
}
