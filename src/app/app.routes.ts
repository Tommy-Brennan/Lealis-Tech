import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Faq } from './pages/faq/faq';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'about', component: About},
    { path: 'services', component: Services},
    { path: 'faq', component: Faq},
    { path: 'contact', component: Contact},
    { path: '**', redirectTo: '' }
];
