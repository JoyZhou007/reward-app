import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EscapeHtmlService {

  constructor() {
  }

  escapeHtml(text: string) {
    let map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/([&]+(?![lt;]|[gt;]|[amp;]|[quot;]|[#039;]))|[<>"']/g, function (m) {
      return map[m];
    });
  }


  public unescapeHtml(text) {
    let reservedMap = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#039;': "'"
    };
    return text.replace(/(&amp;)|(&lt;)|(&gt;)|(&quot;)|(&#039;)/g, function (m) {
      return reservedMap[m];
    });
  }
}
