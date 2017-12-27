import { HttpHeaders } from '@angular/common/http';
export const environment = {
  production: true,
    mainUrl : 'http://josuevalrob.webfactional.com/angular-drupal',
    httpHaljson : {
  				  headers: new HttpHeaders({ 
  				  "X-CSRF-Token": "-_NtFGZ3YrFOHrhyoR2YkrFJepvUa35PUW8jljjdyqg",
  				  "Authorization": "Basic -_NtFGZ3YrFOHrhyoR2YkrFJepvUa35PUW8jljjdyqg", // encoded user/pass - this is admin/123qwe
  				  // "Content-Type": "application/json"
  				  "Content-Type": "application/hal+json"
  				  }),
  				}
};
