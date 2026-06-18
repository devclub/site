import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { format, formatDistanceToNow } from 'date-fns';
import { enUS, et, ru, Locale } from 'date-fns/locale';
import { YoutubeVideo } from '../models/YoutubeVideo.model';
import { CachedHttpService } from '../services/CachedHttpService';
import { TranslationService } from '../translations/TranslationService';
import { AppContext } from '../context/AppContext';
import { TranslatePipe } from '../translations/TranslatePipe';
import { DcTitleRowComponent } from '../components/dc-title-row.component';

const LOCALES: Record<string, Locale> = { en: enUS, ru: ru, et: et };

@Component({
  selector: 'dc-latest-videos-block',
  imports: [CommonModule, TranslatePipe, DcTitleRowComponent],
  templateUrl: './dc-latest-videos-block.component.html',
  styleUrls: ['./dc-latest-videos-block.component.css']
})
export class DcLatestVideosBlockComponent {
  public videos: YoutubeVideo[] = [];

  constructor() {
    const appContext = inject(AppContext);
    const translationService = inject(TranslationService);
    const cachedHttp = inject(CachedHttpService);

    if (!appContext.config.googleApiKey) {
      return; // nothing, if google api key is not defined.
    }

    const url =
      'https://www.googleapis.com/youtube/v3/playlistItems' +
      '?part=snippet,id&maxResults=12' +
      '&key=' +
      appContext.config.googleApiKey +
      '&playlistId=' +
      appContext.config.frontpagePlaylistId;
    cachedHttp
      .get<any>(url)
      .then((val) => val.items.forEach((i: any) => this.addYoutubeVideo(i, translationService)))
      .catch((error) => console.error('Failed to load latest videos from YouTube', error));
  }

  addYoutubeVideo(item: any, translationService: TranslationService): void {
    const video = new YoutubeVideo();
    video.id = item.snippet.resourceId.videoId;
    video.title = item.snippet.title;
    const publishedAt = new Date(item.snippet.publishedAt);
    const locale = LOCALES[translationService.lang] ?? enUS;
    video.publishedAt = format(publishedAt, 'yyyy.MM.dd HH:mm');
    video.publishedAgo = formatDistanceToNow(publishedAt, { addSuffix: true, locale });
    video.imageUrl = item.snippet.thumbnails.high.url;
    video.url = 'https://www.youtube.com/watch?v=' + video.id;
    this.videos.push(video);
  }
}
