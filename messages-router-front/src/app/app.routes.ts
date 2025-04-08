import { Routes } from '@angular/router';
import { MessageListComponent } from './messages/components/message-list/message-list.component';
import { PartnerListComponent } from './partners/partner-list/partner-list.component';


export const routes: Routes = [
    { path: 'messages', component: MessageListComponent },
    { path: 'partners', component: PartnerListComponent },
    { path: '**', redirectTo: 'messages' }
];

