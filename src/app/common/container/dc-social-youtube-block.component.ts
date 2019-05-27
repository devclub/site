import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataContext} from '../context/data.context';

declare var FB: any;

@Component({
  selector: 'dc-social-youtube-block',
  templateUrl: './dc-social-youtube-block.component.html'
})
export class DcSocialYoutubeBlockComponent implements OnInit, OnDestroy {
  youtubeChannelIds: string[] = [];

  constructor(private dataContext: DataContext) {
    this.youtubeChannelIds.push(dataContext.config.resources.main.youtubeChannelId);
    dataContext.config.resources.extra.forEach(res => {
      if (res.youtubeChannelId) {
        this.youtubeChannelIds.push(res.youtubeChannelId);
      }
    });
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
    this.addScript('google-apis', 'https://apis.google.com/js/platform.js');
  }

  ngOnDestroy() {
    const elements = document.getElementsByTagName('script');
    const parentNode = elements[0].parentNode;
    for (let i = (elements.length - 1); i >= 0; i--) {
      if (elements[i].id === 'google-apis'
        || elements[i].src.startsWith('https://apis.google.com')) {
        parentNode.removeChild(elements[i]);
      }
    }
  }
}
