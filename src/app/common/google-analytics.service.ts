import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

declare var ga: Function;

@Injectable()
export class GoogleAnalyticsService {

  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      try {
        if (typeof ga === 'function') {
          if (event instanceof NavigationEnd) {
            ga('set', 'page', event.urlAfterRedirects);
            ga('send', 'pageview');
            console.log('%%% Google Analytics page view event %%%');
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  /**
   * Emit google analytics event
   * Fire event example:
   * this.emitEvent("testCategory", "testAction", "testLabel", 10);
   * @param {string} eventCategory
   * @param {string} eventAction
   * @param {string} eventLabel
   * @param {number} eventValue
   */
  public emitEvent(eventCategory: string,
                   eventAction: string,
                   eventLabel: string = null,
                   eventValue: number = null) {
    if (typeof ga === 'function') {
      ga('send', 'event', {
        eventCategory: eventCategory,
        eventLabel: eventLabel,
        eventAction: eventAction,
        eventValue: eventValue
      });
    }
  }

  public appendGaTrackingCode(googleAnalyticsKey: string) {
    try {
      const script1 = document.createElement('script');
      script1.id = 'googletagmanager';
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=' + googleAnalyticsKey;
      script1.type = 'text/javascript';
      script1.async = true;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.id = 'gtag';
      script2.type = 'text/javascript';
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '` + googleAnalyticsKey + `');
      `;
      document.head.appendChild(script2);
    } catch (ex) {
      console.error('Error appending google analytics');
      console.error(ex);
    }
  }
}
