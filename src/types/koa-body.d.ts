declare module "koa-body" {
  import { Middleware } from "koa";

  interface IKoaBodyOptions {
    multipart?: boolean;
    urlencoded?: boolean;
    json?: boolean;
    text?: boolean;
    encoding?: string;
    jsonLimit?: string;
    textLimit?: string;
    formLimit?: string;
    queryString?: { arrayLimit: number };
    formidable?: {
      maxFileSize?: number;
      keepExtensions?: boolean;
      uploadDir?: string;
      multiples?: boolean;
    };
  }

  function koaBody(options?: IKoaBodyOptions): Middleware;

  export = koaBody;
}
