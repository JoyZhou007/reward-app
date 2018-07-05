import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EscapeHtmlService {

  constructor() {
  }

  public escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  public unescapeHtml(safe) {
    return safe
      .replace('&amp;', /&/g)
      .replace('&lt;', /</g)
      .replace('&gt;', />/g)
      .replace('&quot;', /"/g)
      .replace('&#039;', /'/g);
  }
}
