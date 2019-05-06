import {Component} from '@angular/core';
import {DataContext} from '../data/data.context';
import {YoutubeVideo} from './models/youtube-video.model';
import * as moment from 'moment';
import {CachedHttpService} from '../data/cached-http.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'dc-latest-videos',
  templateUrl: './dc-latest-videos.component.html',
  styleUrls: ['./dc-latest-videos.component.css']
})
export class DcLatestVideosComponent {
  videos: YoutubeVideo[] = [];

  constructor(private dataContext: DataContext,
              private translate: TranslateService,
              private cachedHttp: CachedHttpService) {
    const url = 'https://www.googleapis.com/youtube/v3/search' +
      '?part=snippet,id&type=video&order=date&maxResults=12' +
      '&key=' + dataContext.config.googleApiKey +
      '&channelId=' + dataContext.config.resources.main.youtubeChannelId;
    this.cachedHttp.get<any>(url).then(val => val.items.forEach(this.addYoutubeVideo.bind(this)));
  }

  addYoutubeVideo(item: any): void {
    const video = new YoutubeVideo();
    video.id = item.id.videoId;
    video.title = item.snippet.title;
    const publishedAt = moment(item.snippet.publishedAt).locale(this.translate.currentLang);
    video.publishedAt = publishedAt.format('YYYY.MM.DD HH:mm');
    video.publishedAgo = publishedAt.fromNow();
    video.imageUrl = item.snippet.thumbnails.high.url;
    video.url = 'https://www.youtube.com/watch?v=' + video.id;
    this.videos.push(video);
  }
}
