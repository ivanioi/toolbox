/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RspString {
  success?: string;
  code?: string;
  msg?: string;
  desc?: string;
  data?: string;
}
export interface AddCheatSheetReq {
  title: string;
  language?: string;
  tags?: string;
  filePath: string;
  type: string;
}
export interface Rsp {
  success?: string;
  code?: string;
  msg?: string;
  desc?: string;
  data?: object;
}
export interface CheatSheetRspPOJO {
  id?: string;
  title?: string;
  language?: string;
  content?: string;
  tags?: string;
  type?: string;
}
export interface QueryCheatSheetRsp {
  list?: CheatSheetRspPOJO[];
  tags?: string[];
}
export interface RspQueryCheatSheetRsp {
  success?: string;
  code?: string;
  msg?: string;
  desc?: string;
  data?: QueryCheatSheetRsp;
}
export interface ExchangeRatePOJO {
  name?: string;
  /** @format date */
  date?: string;
  detail?: Record<string, number>;
}
export interface RspExchangeRatePOJO {
  success?: string;
  code?: string;
  msg?: string;
  desc?: string;
  data?: ExchangeRatePOJO;
}
export interface ExchangeRateChangePair {
  /** @format date */
  date?: string;
  /** @format double */
  exchangeRate?: number;
}
export interface ExchangeRateHistoryPOJO {
  baseCurrency?: string;
  compareCurrency?: string;
  history?: ExchangeRateChangePair[];
}
export interface RspExchangeRateHistoryPOJO {
  success?: string;
  code?: string;
  msg?: string;
  desc?: string;
  data?: ExchangeRateHistoryPOJO;
}
export interface CurrenicesRsp {
  currenices?: Record<string, string>;
  /** @format int32 */
  total?: number;
}
export interface RspCurrenicesRsp {
  success?: string;
  code?: string;
  msg?: string;
  desc?: string;
  data?: CurrenicesRsp;
}
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
export type QueryParamsType = Record<string | number, any>;
export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}
export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}
export declare enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}
export declare class HttpClient<SecurityDataType = unknown> {
  instance: AxiosInstance;
  private securityData;
  private securityWorker?;
  private secure?;
  private format?;
  constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
  setSecurityData: (data: SecurityDataType | null) => void;
  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig;
  protected stringifyFormItem(formItem: unknown): string;
  protected createFormData(input: Record<string, unknown>): FormData;
  request: <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams) => Promise<AxiosResponse<T>>;
}
/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://127.0.0.1:8080
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api: {
    /**
     * No description
     *
     * @tags simple-file-upload-controller
     * @name UploadFile
     * @summary 通用文件上传接口
     * @request POST:/api/upload/simple
     */
    uploadFile: (
      query: {
        /** 上传文件所属功能模块名称 */
        feature: string;
      },
      data: {
        /**
         * 上传的文件字段必须为 file
         * @format binary
         */
        file: File;
      },
      params?: RequestParams,
    ) => Promise<AxiosResponse<RspString>>;
    /**
     * No description
     *
     * @tags cheat-sheet-controller
     * @name InsertOne
     * @request POST:/api/feature/cheatsheet/insertOne
     */
    insertOne: (data: AddCheatSheetReq, params?: RequestParams) => Promise<AxiosResponse<Rsp>>;
    /**
     * @description Test Hello World API
     *
     * @tags hello-world-controller
     * @name HelloWorld
     * @summary Test API
     * @request GET:/api/hello
     */
    helloWorld: (
      query?: {
        name?: string;
      },
      params?: RequestParams,
    ) => Promise<AxiosResponse<RspString>>;
    /**
     * No description
     *
     * @tags cheat-sheet-controller
     * @name Query
     * @request GET:/api/feature/cheatsheet/query
     */
    query: (
      query?: {
        title?: string;
        tag?: string;
      },
      params?: RequestParams,
    ) => Promise<AxiosResponse<RspQueryCheatSheetRsp>>;
    /**
     * No description
     *
     * @tags cheat-sheet-controller
     * @name DeleteOne
     * @request GET:/api/feature/cheatsheet/deleteOne/{id}
     */
    deleteOne: (id: number, params?: RequestParams) => Promise<AxiosResponse<Rsp>>;
    /**
     * No description
     *
     * @tags exchange-rate-controller
     * @name GetExchangeRate
     * @request GET:/api/exchangerate@{date}/{currencyShortName}
     */
    getExchangeRate: (
      date: string,
      currencyShortName: string,
      params?: RequestParams,
    ) => Promise<AxiosResponse<RspExchangeRatePOJO>>;
    /**
     * No description
     *
     * @tags exchange-rate-controller
     * @name GetExchangeRateHistory
     * @request GET:/api/exchangerate/history/{baseCurrency}/{compareCurrency}
     */
    getExchangeRateHistory: (
      baseCurrency: string,
      compareCurrency: string,
      params?: RequestParams,
    ) => Promise<AxiosResponse<RspExchangeRateHistoryPOJO>>;
    /**
     * No description
     *
     * @tags exchange-rate-controller
     * @name Currencies
     * @request GET:/api/currenices
     */
    currencies: (params?: RequestParams) => Promise<AxiosResponse<RspCurrenicesRsp>>;
  };
}
