const serverUrls = {
  localServer: "http://192.168.0.5:8080/api/",
  devServer: "https://dev.pickyourtrail.com/api/",
  stagingSever: "https://staging.pickyourtrail.com/api/",
  prodServer: "https://pickyourtrail.com/api/",
  cityImageBaseUrl: "https://d3lf10b5gahyby.cloudfront.net/city/960xh/",
  miscImageBaseUrl: "https://d3lf10b5gahyby.cloudfront.net/misc/",
  googleTranslateTts: (phrase, language) =>
    `https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${phrase}&tl=${language}&client=tw-ob`,
  airlineCdn: "https://d3lf10b5gahyby.cloudfront.net/airline_logos/",
  crispServerUrl:
    "https://go.crisp.chat/chat/embed/?website_id=b611e2e5-45aa-4b4e-bb40-bf30d8e935be",
  productUrl: "https://pickyourtrail.com",

  darkSkyKey: "1f95e4bd24b4377d484d0cfceae84a74",
  darkSkyDomain: "https://api.darksky.net/"
};

export default serverUrls;
