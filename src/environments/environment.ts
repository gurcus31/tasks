// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: false,
  mainUrl : 'http://drupal.dd:8083',
  httpHaljson : {
				  headers: new HttpHeaders({ 
				  "X-CSRF-Token": "Qfnczb1SUnvOAsEy0A_xuGp_rkompgO2oTkCBOSEItM",
				  "Authorization": "Basic Qfnczb1SUnvOAsEy0A_xuGp_rkompgO2oTkCBOSEItM", // encoded user/pass - this is admin/123qwe
				  // "Content-Type": "application/json"
				  "Content-Type": "application/hal+json"
				  })
				}
};
