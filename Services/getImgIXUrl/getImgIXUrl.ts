import {
  CONSTANT_imgixTestimonialBaseUrl,
  CONSTANT_imgixBaseUrl
} from "../../constants/serverUrls";

const getDPR = () => 1;

const IMGIX_BASE = CONSTANT_imgixBaseUrl;
const IMGIX_TESTIMONIAL_BASE = CONSTANT_imgixTestimonialBaseUrl;

/**
 * @desc This will take the S3 URL and gives us the appropriate imgIX URL
 * @param {string} src - actual URL of the image - usually it would be S3 URL
 * @param {string} imgFactor - Image query parameters for imgIX e.g: w=600&h=200 which will produce the image with 600px width and 200px height.
 * @returns {string}
 * @exports
 *
 * @example src = "https://d3lf10b5gahyby.cloudfront.net/cityImages/75/singapore-1.jpg" & imgFactor="w=600"
 * STEP #1: imgPath = d3lf10b5gahyby.cloudfront.net/cityImages/75/singapore-1.jpg
 * STEP #2: origin = d3lf10b5gahyby.cloudfront.net
 * STEP #3: case 'd3lf10b5gahyby.cloudfront.net' will match so, imgPath = //pyt-images.imgix.net/images/cityImages/75/singapore-1.jpg
 * STEP #4: imgFactor is there and imgPath has pyt-images.imgix.net so final returned URL will be //pyt-images.imgix.net/images/cityImages/75/singapore-1.jpg?w=600
 */
export type getImgIXType = {
  src: string;
  imgFactor?: string;
  q?: number;
  DPR?: number;
  enhance?: boolean;
};

export default function getImgIXUrl({
  src,
  imgFactor = "",
  q = 20,
  DPR = 1,
  enhance = true
}: getImgIXType): string {
  // Check if src is valid (not undefined | false ) then proceed
  if (src) {
    let imgPath = src.replace(/^(https?:|)\/\//, ""); // Will remove the (http/https://) from the source and assign that to new variable imgPath = d3lf10b5gahyby.cloudfront.net/cityImages/75/singapore-1.jpg

    let origin = imgPath.split("/")[0]; // this will split at [/] and return the first portion of the URL @origin name
    // Compare the origin to identify the respective imgIX url for the particular bucket.
    // IMGIX_TESTIMONIAL_BASE is //pyt-testimonial.imgix.net setup against //pyt-testimonialimages.s3.ap-south-1.amazonaws.com bucket
    // IMGIX_BASE is //pyt-images.imgix.net setup against //s3.ap-south-1.amazonaws.com/oceanjar-new
    switch (origin) {
      case "pyt-testimonialimages.s3.ap-south-1.amazonaws.com":
        imgPath = imgPath.replace(origin, IMGIX_TESTIMONIAL_BASE);
        break;
      case "d3lf10b5gahyby.cloudfront.net": // is a cloudfront URL for the //s3.ap-south-1.amazonaws.com/oceanjar-new/images this bucket. So we have to add /images to imgIX URL to point to the proper bucket
        imgPath = imgPath.replace(origin, IMGIX_BASE + "/images");
        break;
      case "s3.ap-south-1.amazonaws.com": // is the basic bucket URL
        imgPath = imgPath.replace(origin, IMGIX_BASE);
        if (imgPath.includes("/oceanjar-new")) {
          // to check if the imgPath has /oceanjar-new text. return {true} if it has otherwise {false}
          imgPath = imgPath.replace("/oceanjar-new", ""); // if we are replacing this to imgIX we have to make sure we have removed the /oceanjan-new bucket name from the URL.
        }
        break;
      case "oceanjar-new.s3.ap-south-1.amazonaws.com": // is the basic bucket URL
        imgPath = imgPath.replace(origin, IMGIX_BASE);
        if (imgPath.includes("/oceanjar-new")) {
          // to check if the imgPath has /oceanjar-new text. return {true} if it has otherwise {false}
          imgPath = imgPath.replace("/oceanjar-new", ""); // if we are replacing this to imgIX we have to make sure we have removed the /oceanjan-new bucket name from the URL.
        }
        break;
      default:
        imgPath = src; // if nothing matches re-assign src to imgPath
    }

    // Take DPR value from parameter into consideration if it passed.
    let dpr = DPR ? DPR : getDPR();

    // if q is passed other than 20 (default for now) then we will decide based on the DPR
    // DPR 1 => low resolution so q has to be higher - 40
    // DPR 2 => high resolution so q has to be lighter - 20
    q = q !== 20 ? q : dpr === 1 ? 40 : 20;

    // Check and add the imgFactor to the final URL
    if (
      imgPath.indexOf(IMGIX_BASE) !== -1 ||
      imgPath.indexOf(IMGIX_TESTIMONIAL_BASE) !== -1 // imgFactor should there & path should contain imgIX (either base or testimonial) URL
    ) {
      if (imgFactor) {
        if (imgFactor === "isTeamSlide") {
          imgFactor = `w=240&auto=format,compress${enhance ? ",enhance" : ""}`;
          dpr = 2;
        }

        return `${imgPath}?${imgFactor}&dpr=${dpr}&auto=format,compress${
          enhance ? ",enhance" : ""
        }&q=${q}`;
      } else {
        return `${imgPath}?dpr=${dpr}&auto=format,compress${
          enhance ? ",enhance" : ""
        }&q=${q}`;
      }
    }
    return `${imgPath}`; // Just return just the imgPath otherwise
  }
  return "";
}
