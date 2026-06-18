import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../translations/TranslatePipe';
import {AppContext} from '../context/AppContext';

declare var FB: any;

@Component({
  imports: [CommonModule, TranslatePipe],
  selector: 'dc-short-info-block',
  templateUrl: './dc-short-info-block.component.html'
})
export class DcShortInfoBlockComponent implements OnInit, OnDestroy {
  public facebookPageUrl: string;
  public facebookGroupUrl: string;

  constructor(appContext: AppContext) {
    this.facebookPageUrl = 'https://www.facebook.com/' + appContext.config.resources.main.facebookPageId;
    this.facebookGroupUrl = 'https://www.facebook.com/groups/' + appContext.config.resources.main.facebookGroupId;
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
    if (fjs && fjs.parentNode) {
      fjs.parentNode.insertBefore(js, fjs);
    } else {
      (document.head || document.body || document.documentElement).appendChild(js);
    }
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
    if (elements.length === 0 || !elements[0].parentNode) {
      return;
    }
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
