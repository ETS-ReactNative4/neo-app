import PackageInfo from "../package.json";

const apiServers = {
  localServer: "http://192.168.0.5:8080/api/",
  devServer: "https://dev.pickyourtrail.com/api/",
  stagingSever: "https://mobile.pickyourtrail.com/",
  prodServer: ""
};

const productUrls = {
  localProductUrl: "http://192.168.0.5:8080/",
  devProductUrl: "https://dev.pickyourtrail.com/",
  stagingProductUrl: "https://staging.pickyourtrail.com/",
  prodProductUrl: ""
};

let apiServerUrl, productUrl;
switch (PackageInfo.environment) {
  case "production":
    apiServerUrl = apiServers.prodServer;
    productUrl = productUrls.prodProductUrl;
    break;

  case "staging":
    apiServerUrl = apiServers.stagingSever;
    productUrl = productUrls.stagingProductUrl;
    break;

  case "dev":
    apiServerUrl = apiServers.devServer;
    productUrl = productUrls.devProductUrl;
    break;

  default:
    apiServerUrl = apiServers.localServer;
    productUrl = productUrls.localProductUrl;
}

const serverUrls = {
  apiServerUrl,
  productUrl,
  cityImageBaseUrl: "https://d2pkrotgd5anq5.cloudfront.net/city/1820xh/",
  miscImageBaseUrl: "https://d3lf10b5gahyby.cloudfront.net/misc/",
  googleTranslateTts: (phrase, language) =>
    `https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${phrase}&tl=${language}&client=tw-ob`,
  airlineCdn: "https://d3lf10b5gahyby.cloudfront.net/airline_logos/",
  crispServerUrl:
    "https://go.crisp.chat/chat/embed/?website_id=a04827ba-5aa9-4540-866f-e1850a0476eb",
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
