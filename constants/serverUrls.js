import { getEnvironmentName } from "../Services/getEnvironmentDetails/getEnvironmentDetails";

const apiServers = {
  localServer: "http://192.168.0.5:8080/api/",
  devServer: "https://dev.pickyourtrail.com/api/",
  stagingSever: "https://mobile.pickyourtrail.com/api/",
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
  stagingProductUrl: "https://staging.pickyourtrail.com/",
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
  crispServerUrl: (email, token) =>
    email && token
      ? encodeURI(
          `${chatCustomUrl}?user_email=${email}&token_id=${token}&webview=true`
        )
      : "",
  offlineContact: "+91 8939891682",

  /**
   * Payment Urls
   */
  startPayment: `${productUrl}voyager/start-payment`,
  paymentSuccess: `${productUrl}payment/processing`,
  paymentFailure: `${productUrl}payment/processing`,
  paymentCancelled: `${productUrl}payment/processing`,
  paymentComplete: `payment/success`,
  paymentInComplete: `payment/failure`,
  paymentCancel: `inclusions`,

  darkSkyKey: "1f95e4bd24b4377d484d0cfceae84a74",
  darkSkyDomain: "https://api.darksky.net/"
};

export default serverUrls;
