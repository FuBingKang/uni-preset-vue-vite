import { $u } from "uview-plus";
import HttpRequest from "uview-plus/libs/luch-request/index";

export {};

declare module "vue" {
  type Hooks = App.AppInstance & Page.PageInstance;
  interface ComponentCustomOptions extends Hooks {}
}

declare global {
  interface Uni {
    $u: $u & {
      toast: (title: string, duration?: number) => void;
      http: HttpRequest
    };
  }
}
