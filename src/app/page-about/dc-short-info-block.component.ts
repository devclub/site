import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataContext} from '../context/data.context';

declare var FB: any;

@Component({
  selector: 'dc-short-info-block',
  templateUrl: './dc-short-info-block.component.html'
})
export class DcShortInfoBlockComponent implements OnInit, OnDestroy {
  facebookPageUrl: string;
  facebookGroupUrl: string;

  constructor(private dataContext: DataContext) {
    this.facebookPageUrl = 'https://www.facebook.com/' + dataContext.config.resources.main.facebookPageId;
    this.facebookGroupUrl = 'https://www.facebook.com/groups/' + dataContext.config.resources.main.facebookGroupId;
  }

  addScript(id: string, url: string, onloadFn?: any) {
    if (document.getElementById(id)) {
      return;
    }

    const js = document.createElement('script');
    js.id = id;
    js.src = url;
    js.type = 'text/javascript';
    js.async = false;
    js.defer = true;
    js.onload = onloadFn;

    const fjs = document.getElementsByTagName('script')[0];
    fjs.parentNode.insertBefore(js, fjs);
  }

  ngOnInit() {
    this.addScript('github-buttons', 'https://buttons.github.io/buttons.js');
    this.addScript('facebook-jssdk', 'https://connect.facebook.net/en_US/sdk.js', () => {
      FB.init({
        appId: '1625014147610457',
        cookie: false,
        xfbml: true,
        version: 'v2.8'
      });
    });
  }

  ngOnDestroy() {
    const elements = document.getElementsByTagName('script');
    const parentNode = elements[0].parentNode;
    for (let i = (elements.length - 1); i >= 0; i--) {
      if (elements[i].id === 'github-buttons'
        || elements[i].id === 'facebook-jssdk'
        || elements[i].src.startsWith('https://connect.facebook.net')) {
        parentNode.removeChild(elements[i]);
      }
    }
  }
}
