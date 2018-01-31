import {Component} from '@angular/core';
import * as fontawesome from '@fortawesome/fontawesome';
import {faCalendarAlt, faCamera, faComments, faDesktop, faRss} from '@fortawesome/fontawesome-free-solid';
import {faEnvelope} from '@fortawesome/fontawesome-free-regular';
import {faGithub, faGooglePlusG, faTwitter, faWordpress, faYoutube} from '@fortawesome/fontawesome-free-brands';

fontawesome.library.add(
  faRss, faComments, faCamera, faDesktop, faCalendarAlt, faEnvelope,
  faGithub, faYoutube, faTwitter, faWordpress, faGooglePlusG);

@Component({
  selector: 'ressources',
  templateUrl: './ressources.html'
})
export class Ressources {
}
