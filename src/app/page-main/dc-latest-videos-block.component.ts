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
    console.log(appContext.config.googleApiKey);
    if (!appContext.config.googleApiKey) {
      return; // nothing, if google api key is not defined.
    }

    const url = 'https://www.googleapis.com/youtube/v3/search' +
      '?part=snippet,id&type=video&order=date&maxResults=12' +
      '&key=' + appContext.config.googleApiKey +
      '&channelId=' + appContext.config.resources.main.youtubeChannelId;
    cachedHttp.get<any>(url).then(val => val.items.forEach(i => this.addYoutubeVideo(i, translationService)));
  }

  addYoutubeVideo(item: any, translationService: TranslationService): void {
    const video = new YoutubeVideo();
    video.id = item.id.videoId;
    video.title = item.snippet.title;
    const publishedAt = moment(item.snippet.publishedAt).locale(translationService.lang);
    video.publishedAt = publishedAt.format('YYYY.MM.DD HH:mm');
    video.publishedAgo = publishedAt.fromNow();
    video.imageUrl = item.snippet.thumbnails.high.url;
    video.url = 'https://www.youtube.com/watch?v=' + video.id;
    this.videos.push(video);
  }
}
