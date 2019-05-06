import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataContext} from '../data/data.context';

declare var FB: any;

@Component({
  selector: 'dc-social-block',
  templateUrl: './dc-social-block.component.html',
  styleUrls: ['./dc-social-block.component.css']
})
export class DcSocialBlockComponent implements OnInit, OnDestroy {
  youtubeChannelIds: string[] = [];
  facebookPageUrl: string;
  facebookGroupUrl: string;

  constructor(private dataContext: DataContext) {
    this.youtubeChannelIds.push(dataContext.config.resources.main.youtubeChannelId);
    dataContext.config.resources.extra.forEach(res => {
      if (res.youtubeChannelId) {
        this.youtubeChannelIds.push(res.youtubeChannelId);
      }
    })
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

  removeScript(id: string) {
    const fjs = document.getElementsByTagName('script')[0];
    fjs.parentNode.removeChild(document.getElementById(id));
  }

  ngOnInit() {
    this.addScript('google-apis', 'https://apis.google.com/js/platform.js');
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
    this.removeScript('google-apis');
    this.removeScript('github-buttons');
    this.removeScript('facebook-jssdk');
  }
}
