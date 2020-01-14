import {
  getEnvironmentName,
  isProduction
} from "../Services/getEnvironmentDetails/getEnvironmentDetails";

const apiServers = {
  localServer: "http://192.168.0.5:8080/api/",
  devServer: "https://dev.pickyourtrail.com/api/",
  stagingSever: "https://uat.longweekend.co.in/api/",
  uatServer: "https://uat.pickyourtrail.com/api/",
  prodServer: "https://mobile-prod.pickyourtrail.com/api/"
};

const platoServers = {
  platoDevServer: "https://plato-uat.pickyourtrail.com/",
  platoProdServer: "https://plato.pickyourtrail.com/"
};

const productUrls = {
  localProductUrl: "http://192.168.0.5:8080/",
  devProductUrl: "https://dev.pickyourtrail.com/",
  stagingProductUrl: "https://uat.longweekend.co.in/",
  uatProductUrl: "https://uat.pickyourtrail.com/",
  prodProductUrl: "https://pickyourtrail.com/"
};

let apiServerUrl, productUrl, platoServerUrl;
switch (getEnvironmentName()) {
  case "production":
    apiServerUrl = apiServers.prodServer;
    productUrl = productUrls.prodProductUrl;
    platoServerUrl = platoServers.platoProdServer;
    break;

  case "uat":
    apiServerUrl = apiServers.uatServer;
    productUrl = productUrls.uatProductUrl;
    platoServerUrl = platoServers.platoDevServer;
    break;

  case "staging":
    apiServerUrl = apiServers.stagingSever;
    productUrl = productUrls.stagingProductUrl;
    platoServerUrl = platoServers.platoDevServer;
    break;

  case "dev":
    apiServerUrl = apiServers.devServer;
    productUrl = productUrls.devProductUrl;
    platoServerUrl = platoServers.platoDevServer;
    break;

  default:
    apiServerUrl = apiServers.localServer;
    productUrl = productUrls.localProductUrl;
}

const chatCustomUrl = `https://pickyourtrail.com/app-chat/`;

const serverUrls = {
  apiServerUrl,
  productUrl,
  chatCustomUrl,
  platoServerUrl,
  cityImageBaseUrl: "https://d2pkrotgd5anq5.cloudfront.net/city/1820xh/",
  miscImageBaseUrl: "https://d3lf10b5gahyby.cloudfront.net/misc/",
  googleTranslateTts: (phrase, language) =>
    `https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${phrase}&tl=${language}&client=tw-ob`,
  airlineCdn: "https://d3lf10b5gahyby.cloudfront.net/airline_logos/",
  chatServerUrl: chatQueryParam =>
    chatQueryParam
      ? encodeURI(
          `https://chat.pickyourtrail.com/${
            isProduction() ? "" : "index-staging.html"
          }${chatQueryParam}`
        )
      : "",

  /**
   * Segment Write Key
   */
  segmentWriteKey: isProduction()
    ? "BjQSStvje7tKYGY64LhjPxBv2Dk24cB5"
    : "Mop3l6qAjzoyzFcZnFe2s1yYcwL8kBuK",

  /**
   * Freshchat iFrame url
   */
  freshChatIframe: "https://wchat.freshchat.com",
  freshChatIframeBlankPage: "about:blank",

  /**
   * Payment Urls
   */
  startPayment: `${productUrl}voyager/initiate-payment`,
  paymentSuccess: `${productUrl}payment/processing`,
  paymentFailure: `${productUrl}payment/processing`,
  paymentCancelled: `${productUrl}payment/processing`,
  paymentComplete: `payment/success`,
  paymentInComplete: `payment/failure`,
  paymentCancel: `inclusions`,

  darkSkyKey: "1f95e4bd24b4377d484d0cfceae84a74",
  darkSkyDomain: "https://api.darksky.net/"
};

export const CONSTANT_productUrl = productUrl;
export const CONSTANT_apiServerUrl = apiServerUrl;
export const CONSTANT_chatCustomUrl = chatCustomUrl;
export const CONSTANT_platoServerUrl = platoServerUrl;
export const CONSTANT_cityImageBaseUrl =
  "https://d2pkrotgd5anq5.cloudfront.net/city/1820xh/";
export const CONSTANT_miscImageBaseUrl =
  "https://d3lf10b5gahyby.cloudfront.net/misc/";
export const CONSTANT_googleTranslateTts = (phrase, language) =>
  `https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${phrase}&tl=${language}&client=tw-ob`;
export const CONSTANT_airlineCdn =
  "https://d3lf10b5gahyby.cloudfront.net/airline_logos/";
export const CONSTANT_chatServerUrl = chatQueryParam =>
  chatQueryParam
    ? encodeURI(
        `https://chat.pickyourtrail.com/${
          isProduction() ? "" : "index-staging.html"
        }${chatQueryParam}`
      )
    : "";

/**
 * Segment Write Key
 */
export const CONSTANT_segmentWriteKey = isProduction()
  ? "BjQSStvje7tKYGY64LhjPxBv2Dk24cB5"
  : "Mop3l6qAjzoyzFcZnFe2s1yYcwL8kBuK";

/**
 * Freshchat iFrame url
 */
export const CONSTANT_freshChatIframe = "https://wchat.freshchat.com";
export const CONSTANT_freshChatIframeBlankPage = "about:blank";

/**
 * Payment Urls
 */
export const CONSTANT_startPayment = `${productUrl}voyager/initiate-payment`;
export const CONSTANT_paymentSuccess = `${productUrl}payment/processing`;
export const CONSTANT_paymentFailure = `${productUrl}payment/processing`;
export const CONSTANT_paymentCancelled = `${productUrl}payment/processing`;
export const CONSTANT_paymentComplete = `payment/success`;
export const CONSTANT_paymentInComplete = `payment/failure`;
export const CONSTANT_paymentCancel = `inclusions`;
export const CONSTANT_darkSkyKey = "1f95e4bd24b4377d484d0cfceae84a74";
export const CONSTANT_darkSkyDomain = "https://api.darksky.net/";

export default serverUrls;
