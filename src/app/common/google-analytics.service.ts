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
      const script = document.createElement('script');
      script.innerHTML = `
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', '` + googleAnalyticsKey + `', 'auto');
      `;
      document.head.appendChild(script);
    } catch (ex) {
      console.error('Error appending google analytics');
      console.error(ex);
    }
  }
}
