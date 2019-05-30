import {Component} from '@angular/core';
import {DataContext} from '../common/context/data.context';
import {YoutubeVideo} from './models/youtube-video.model';
import * as moment from 'moment';
import {CachedHttpService} from '../common/cached-http.service';
import {TranslationService} from '../common/translations/translation.service';

@Component({
  selector: 'dc-latest-videos-block',
  templateUrl: './dc-latest-videos-block.component.html',
  styleUrls: ['./dc-latest-videos-block.component.css']
})
export class DcLatestVideosBlockComponent {
  videos: YoutubeVideo[] = [];

  constructor(private dataContext: DataContext,
              private translationService: TranslationService,
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
    const publishedAt = moment(item.snippet.publishedAt).locale(this.translationService.lang);
    video.publishedAt = publishedAt.format('YYYY.MM.DD HH:mm');
    video.publishedAgo = publishedAt.fromNow();
    video.imageUrl = item.snippet.thumbnails.high.url;
    video.url = 'https://www.youtube.com/watch?v=' + video.id;
    this.videos.push(video);
  }
}
