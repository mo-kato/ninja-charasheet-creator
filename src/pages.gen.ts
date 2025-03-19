// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as Root_getConfig } from './pages/_root';
// prettier-ignore
import type { getConfig as CreateIndex_getConfig } from './pages/create/index';
// prettier-ignore
import type { getConfig as EditIndex_getConfig } from './pages/edit/index';
// prettier-ignore
import type { getConfig as Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as ListIndex_getConfig } from './pages/list/index';
// prettier-ignore
import type { getConfig as ViewIndex_getConfig } from './pages/view/index';

// prettier-ignore
type Page =
| ({ path: '/_root' } & GetConfigResponse<typeof Root_getConfig>)
| ({ path: '/create' } & GetConfigResponse<typeof CreateIndex_getConfig>)
| ({ path: '/edit' } & GetConfigResponse<typeof EditIndex_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof Index_getConfig>)
| ({ path: '/list' } & GetConfigResponse<typeof ListIndex_getConfig>)
| ({ path: '/view' } & GetConfigResponse<typeof ViewIndex_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
  