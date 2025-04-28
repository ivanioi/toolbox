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
export interface LeetCodeUpdateREQ {
  /** @format int64 */
  id: number;
  name?: string;
  link?: string;
  mainType?: string;
  subType?: string;
  questionTags?: string;
  origin?: string;
  /**
   * @format int32
   * @min 0
   * @max 1
   */
  isIconic?: number;
  /**
   * @format int32
   * @min 0
   * @max 2
   */
  level?: number;
  /** @format int32 */
  status?: number;
  /** @format int32 */
  proficiencyRating?: number;
}
export interface Rsp {
  success?: string;
  code?: string;
  msg?: string;
  desc?: string;
  data?: object;
}
export interface LeetCodeQueryREQ {
  mainType?: string;
  subType?: string;
  questionTags?: string;
  proficiencyRating?: string;
  level?: string;
  status?: string;
}
export interface LeetCodeAddREQ {
  name: string;
  link: string;
  mainType: string;
  subType: string;
  questionTags?: string;
  origin: string;
  /**
   * @format int32
   * @min 0
   * @max 1
   */
  isIconic: number;
  /**
   * @format int32
   * @min 0
   * @max 2
   */
  level: number;
}
export interface UpdateEntropyPO {
  /**
   * @format int32
   * @min 0
   * @max 1
   */
  type: number;
  /**
   * @format int32
   * @min 1
   */
  count: number;
}
export interface AddCheatSheetReq {
  title: string;
  language?: string;
  tags?: string;
  filePath: string;
  type: string;
  content?: string;
  links?: string;
}
export interface EntropyInfoVO {
  /** @format int32 */
  defaultEntropy?: number;
  /** @format int32 */
  defaultInverseEntropy?: number;
  /** @format int32 */
  updateEntropy?: number;
  /** @format int32 */
  updateInverseEntropy?: number;
}
export interface RspEntropyInfoVO {
  success?: string;
  code?: string;
  msg?: string;
  desc?: string;
  data?: EntropyInfoVO;
}
export interface CheatSheetRsp {
  id?: string;
  title?: string;
  language?: string;
  content?: string;
  tags?: string;
  type?: string;
  links?: string;
}
export interface QueryCheatSheetRsp {
  list?: CheatSheetRsp[];
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
  fileUpload: {
    /**
     * No description
     *
     * @tags FileUpload
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
  };
  leetCode: {
    /**
     * No description
     *
     * @tags LeetCode
     * @name UpdateQuestion
     * @request POST:/api/feature/leetcode/update
     */
    updateQuestion: (data: LeetCodeUpdateREQ, params?: RequestParams) => Promise<AxiosResponse<Rsp>>;
    /**
     * No description
     *
     * @tags LeetCode
     * @name QueryQuestions
     * @request POST:/api/feature/leetcode/query
     */
    queryQuestions: (data: LeetCodeQueryREQ, params?: RequestParams) => Promise<AxiosResponse<Rsp>>;
    /**
     * No description
     *
     * @tags LeetCode
     * @name AddQuestion
     * @request POST:/api/feature/leetcode/add
     */
    addQuestion: (data: LeetCodeAddREQ, params?: RequestParams) => Promise<AxiosResponse<Rsp>>;
    /**
     * No description
     *
     * @tags LeetCode
     * @name SelectFilterColumns
     * @request GET:/api/feature/leetcode/filters
     */
    selectFilterColumns: (
      query?: {
        mainType?: string;
      },
      params?: RequestParams,
    ) => Promise<AxiosResponse<Rsp>>;
    /**
     * No description
     *
     * @tags LeetCode
     * @name DeleteQuestion
     * @request GET:/api/feature/leetcode/delete
     */
    deleteQuestion: (
      query: {
        /** @format int64 */
        id: number;
      },
      params?: RequestParams,
    ) => Promise<AxiosResponse<Rsp>>;
  };
  entropyController: {
    /**
     * No description
     *
     * @tags entropy-controller
     * @name GetEntropyInfo
     * @request GET:/api/feature/entropy
     */
    getEntropyInfo: (
      query?: {
        /** @format date */
        startDate?: string;
        /** @format date */
        endDate?: string;
      },
      params?: RequestParams,
    ) => Promise<AxiosResponse<RspEntropyInfoVO>>;
    /**
     * No description
     *
     * @tags entropy-controller
     * @name UpdateEntropy
     * @request POST:/api/feature/entropy
     */
    updateEntropy: (data: UpdateEntropyPO, params?: RequestParams) => Promise<AxiosResponse<Rsp>>;
  };
  cheatSheet: {
    /**
     * No description
     *
     * @tags CheatSheet
     * @name InsertOne
     * @request POST:/api/feature/cheatsheet/insertOne
     */
    insertOne: (data: AddCheatSheetReq, params?: RequestParams) => Promise<AxiosResponse<Rsp>>;
    /**
     * No description
     *
     * @tags CheatSheet
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
     * @tags CheatSheet
     * @name DeleteOne
     * @request GET:/api/feature/cheatsheet/deleteOne/{id}
     */
    deleteOne: (id: number, params?: RequestParams) => Promise<AxiosResponse<Rsp>>;
  };
  helloWorldController: {
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
  };
  exchangeRate: {
    /**
     * No description
     *
     * @tags ExchangeRate
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
     * @tags ExchangeRate
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
     * @tags ExchangeRate
     * @name Currencies
     * @request GET:/api/currenices
     */
    currencies: (params?: RequestParams) => Promise<AxiosResponse<RspCurrenicesRsp>>;
  };
}
