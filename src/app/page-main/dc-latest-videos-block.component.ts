import {Component} from '@angular/core';
import {YoutubeVideo} from '../models/YoutubeVideo.model';
import * as moment from 'moment';
import {CachedHttpService} from '../services/CachedHttpService';
import {TranslationService} from '../translations/TranslationService';
import {AppContext} from '../context/AppContext';

@Component({
  selector: 'dc-latest-videos-block',
  templateUrl: './dc-latest-videos-block.component.html',
  styleUrls: ['./dc-latest-videos-block.component.css']
})
export class DcLatestVideosBlockComponent {
  public videos: YoutubeVideo[] = [];

  constructor(appContext: AppContext, translationService: TranslationService, cachedHttp: CachedHttpService) {
    if (!appContext.config.googleApiKey) {
      return; // nothing, if google api key is not defined.
    }

    const url = 'https://www.googleapis.com/youtube/v3/playlistItems' +
      '?part=snippet,id&maxResults=12' +
      '&key=' + appContext.config.googleApiKey +
      '&playlistId=' + appContext.config.frontpagePlaylistId;
    cachedHttp.get<any>(url).then(val => val.items.forEach(i => this.addYoutubeVideo(i, translationService)));
  }

  addYoutubeVideo(item: any, translationService: TranslationService): void {
    const video = new YoutubeVideo();
    video.id = item.snippet.resourceId.videoId;
    video.title = item.snippet.title;
    const publishedAt = moment(item.snippet.publishedAt).locale(translationService.lang);
    video.publishedAt = publishedAt.format('YYYY.MM.DD HH:mm');
    video.publishedAgo = publishedAt.fromNow();
    video.imageUrl = item.snippet.thumbnails.high.url;
    video.url = 'https://www.youtube.com/watch?v=' + video.id;
    this.videos.push(video);
  }
}
