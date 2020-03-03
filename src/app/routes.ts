import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { NavComponent } from './nav/nav.component';
import { RecurrenceComponent } from './recurrence/recurrence.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: NavComponent},
            { path: 'appointment', component: RecurrenceComponent}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'},
];
