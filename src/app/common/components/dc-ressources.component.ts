import {Component} from '@angular/core';
import {DataContext} from '../context/data.context';
import {RessourceGroup} from '../models/ressource-group.model';
import {Ressource} from '../models/ressource.model';
import {ConfigResource} from '../models/config-resource.model';

@Component({
  selector: 'dc-ressources',
  templateUrl: './dc-ressources.component.html'
})
export class DcRessourcesComponent {
  public groups: RessourceGroup[] = [];

  constructor(private dataContext: DataContext) {
    this.addGroup(this.dataContext.config.resources.main, 'resource.title.main');
    this.dataContext.config.resources.extra.forEach(cr => this.addGroup(cr));
  }

  trackByIndex(index: number) {
    return index;
  }

  addGroup(resource: ConfigResource, title?: string): void {
    const group = new RessourceGroup();
    group.title = title ? title : resource.title;
    if (resource.mail) {
      this.addRessource(group,
        'mailto:' + resource.mail,
        ['fas', 'envelope'],
        resource.mail);
    }
    if (resource.site) {
      this.addRessource(group,
        resource.site,
        ['fas', 'desktop'],
        'resource.site');
    }
    if (resource.youtubeChannelId) {
      this.addRessource(group,
        'https://www.youtube.com/channel/' + resource.youtubeChannelId,
        ['fab', 'youtube'],
        'resource.youtube');
    }
    if (resource.facebookPageId) {
      this.addRessource(group,
        'https://www.facebook.com/' + resource.facebookPageId,
        ['fab', 'facebook'],
        'resource.facebookpage');
    }
    if (resource.facebookGroupId) {
      this.addRessource(group,
        'https://www.facebook.com/groups/' + resource.facebookGroupId,
        ['fab', 'facebook'],
        'resource.facebookgroup');
    }
    if (resource.flickr) {
      this.addRessource(group,
        resource.flickr,
        ['fas', 'camera'],
        'resource.photo');
    }
    if (resource.twitter) {
      this.addRessource(group,
        resource.twitter,
        ['fab', 'twitter'],
        'resource.twitter');
    }
    if (resource.googlecalendar) {
      this.addRessource(group,
        resource.googlecalendar,
        ['fas', 'calendar-alt'],
        'resource.googlecalendar');
    }
    if (resource.googlegroup) {
      this.addRessource(group,
        resource.googlegroup,
        ['fas', 'comments'],
        'resource.googlegroup');
    }
    if (resource.blog) {
      this.addRessource(group,
        resource.blog,
        ['fab', 'wordpress'],
        'resource.blog');
    }
    if (resource.blogFeed) {
      this.addRessource(group,
        resource.blogFeed,
        ['fas', 'rss'],
        'resource.blogfeed');
    }
    if (resource.github) {
      this.addRessource(group,
        resource.github,
        ['fab', 'github'],
        'resource.github');
    }
    this.groups.push(group);
  }

  addRessource(group: RessourceGroup, url: string, iconClasses: string[], messageCode: string) {
    const rs = new Ressource();
    rs.url = url;
    rs.iconClasses = iconClasses;
    rs.messageCode = messageCode;
    group.ressources.push(rs);
  }
}
