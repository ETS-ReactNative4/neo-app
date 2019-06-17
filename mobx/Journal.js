import { observable, computed, action, toJS } from "mobx";
import constants from "../constants/constants";
import { hydrate } from "./Store";
import { persist } from "mobx-persist";
import { createTransformer } from "mobx-utils";
import { logError } from "../Services/errorLogger/errorLogger";
import apiCall from "../Services/networkRequests/apiCall";
import storeService from "../Services/storeService/storeService";
import _ from "lodash";
import { Platform } from "react-native";
import imageUploader from "../Services/imageUploader/imageUploader";

const journalLevels = {
  page: "PAGE",
  story: "STORY",
  journal: "JOURNAL"
};

class Journal {
  static hydrator = storeInstance => {
    hydrate("_homeScreenDetails", storeInstance)
      .then(() => null)
      .catch(err => logError(err));
    hydrate("_journalDetails", storeInstance)
      .then(() => null)
      .catch(err => logError(err));
  };

  /**
   * Journal Home Screen API
   * --------------------------------------------------------------
   */

  @persist("object")
  @observable
  _homeScreenDetails = {};

  @observable _isHomeScreenLoading = false;

  @observable _homeScreenError = false;

  @computed
  get homeScreenDetails() {
    return toJS(this._homeScreenDetails);
  }

  @computed
  get isHomeScreenLoading() {
    return this._isHomeScreenLoading;
  }

  @computed
  get homeScreenError() {
    return this._homeScreenError;
  }

  /**
   *
   */
  @action
  getHomeScreenDetails = () => {
    const itineraryId = storeService.itineraries.selectedItineraryId;
    this._isHomeScreenLoading = true;
    apiCall(
      `${constants.getJournalScreenDetails}?itineraryId=${itineraryId}`,
      {},
      "GET"
    )
      .then(response => {
        this._isHomeScreenLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._homeScreenDetails = response.data;
          this._homeScreenError = false;
        } else {
          this._homeScreenError = true;
        }
      })
      .catch(() => {
        this._isHomeScreenLoading = false;
        this._homeScreenError = true;
      });
  };

  /**
   * Refresh journal Data whenever needed
   * --------------------------------------------------------------
   */

  @observable _isJournalRefreshing = false;

  @observable _journalRefreshError = false;

  @computed
  get isJournalRefreshing() {
    return this._isJournalRefreshing;
  }

  @computed
  get journalRefreshError() {
    return this._journalRefreshError;
  }

  @action
  refreshJournalInformation = (callback = () => null) => {
    const itineraryId = storeService.itineraries.selectedItineraryId;
    this._isJournalRefreshing = true;
    apiCall(
      `${constants.refreshJournalData}?itineraryId=${itineraryId}`
      // {},
      // "GET"
    )
      .then(response => {
        this._isJournalRefreshing = false;
        if (response.status === constants.responseSuccessStatus) {
          this._journalRefreshError = false;
          this._journalDetails = response.data;
          callback();
        } else {
          this._journalRefreshError = true;
        }
      })
      .catch(() => {
        this._isJournalRefreshing = false;
        this._journalRefreshError = true;
      });
  };

  /**
   * Journal Start - Initialization API
   * --------------------------------------------------------------
   */
  @persist("object")
  @observable
  _journalDetails = {};

  @observable _isJournalDetailsLoading = false;

  @observable _journalDetailsError = false;

  @observable _isJournalTitleLoading = false;

  @observable _isJournalTitleError = false;

  @computed
  get journalId() {
    if (_.isEmpty(this.journalDetails)) {
      return "";
    }
    return this.journalDetails.journalId;
  }

  @computed
  get journalDetails() {
    return toJS(this._journalDetails);
  }

  @computed
  get journalStartData() {
    if (_.isEmpty(this.journalDetails)) {
      return {};
    }
    return {
      title: this._journalDetails.sugTitle,
      titleLength: this._journalDetails.sugTitleLength,
      desc: this._journalDetails.sugDesc,
      descLength: this._journalDetails.sugDescLength
    };
  }

  @computed
  get isJournalDetailsLoading() {
    return this._isJournalDetailsLoading;
  }

  @computed
  get journalDetailsError() {
    return this._journalDetailsError;
  }

  @computed
  get isJournalTitleLoading() {
    return this._isJournalTitleLoading;
  }

  @computed
  get isJournalTitleError() {
    return this._isJournalTitleError;
  }

  @action
  initializeJournalDetails = () => {
    this._isJournalDetailsLoading = true;
    const itineraryId = storeService.itineraries.selectedItineraryId;
    apiCall(`${constants.initializeJournal}?itineraryId=${itineraryId}`)
      .then(response => {
        this._isJournalDetailsLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._journalDetailsError = false;
          this._journalDetails = response.data;
        } else {
          this._journalDetailsError = true;
        }
      })
      .catch(() => {
        this._isJournalDetailsLoading = false;
        this._journalDetailsError = true;
      });
  };

  @action
  updateJournalTitle = ({ title, desc }, callback = () => null) => {
    const journalId = this.journalId;
    const itineraryId = storeService.itineraries.selectedItineraryId;
    const requestObject = {
      data: [
        {
          key: "title",
          value: title
        },
        {
          key: "desc",
          value: desc
        }
      ],
      id: journalId,
      itineraryId,
      type: journalLevels.journal
    };
    this._isJournalTitleLoading = true;
    apiCall(constants.updateJournalDetails, requestObject)
      .then(response => {
        this._isJournalTitleLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._isJournalTitleError = false;
          this.refreshJournalInformation(() => {
            callback();
          });
        } else {
          this._isJournalTitleError = true;
        }
      })
      .catch(() => {
        this._isJournalTitleLoading = false;
        this._isJournalTitleError = true;
      });
  };

  /**
   * Retrieve Information from journal Details
   * --------------------------------------------------------------
   */
  @computed
  get categorizedPages() {
    if (_.isEmpty(this.journalDetails)) {
      return { upcoming: [], completed: [] };
    }
    try {
      const pages = this.journalDetails.journal.pages;
      return pages.reduce(
        (pageAccumulator, page) => {
          if (page.dayCompleted) {
            pageAccumulator.completed.push(page);
          } else {
            pageAccumulator.upcoming.push(page);
          }
          return pageAccumulator;
        },
        { upcoming: [], completed: [] }
      );
    } catch (e) {
      logError(e);
      return { upcoming: [], completed: [] };
    }
  }

  getStoriesByPageId = createTransformer(pageId => {
    if (_.isEmpty(this.journalDetails)) {
      return [];
    }
    try {
      const pages = this.journalDetails.journal.pages;
      const requiredPage = pages.find(page => page.pageId === pageId);
      if (requiredPage) return requiredPage.stories || [];
      else return [];
    } catch (e) {
      logError(e);
      return [];
    }
  });

  /**
   * Maintaining the Images List and the upload queue
   */

  @persist("list")
  @observable
  _imageUploadQueue = [];

  @computed
  get imageUploadQueue() {
    return toJS(this._imageUploadQueue);
  }

  @action
  addImagesToQueue = (storyId, imagesList = []) => {
    try {
      this._imageUploadQueue = [
        {
          storyId,
          imagesList: imagesList.map(image => ({ image, isUploaded: false }))
        }
      ];
      // this._imageUploadQueue.push({
      //   storyId,
      //   imagesList: imagesList.map(image => ({ image, isUploaded: false }))
      // });
      // this._imageUploadQueue = [ ...this.imageUploadQueue, {
      //   storyId,
      //   imagesList: imagesList.map(image => ({image, isUploaded: false})),
      // }];
      this.startImageUploadQueue();
    } catch (error) {
      logError("Failed to create image upload queue", { error });
    }
  };

  @action
  startImageUploadQueue = () => {
    const uploadImage = (
      storyId,
      imageToUpload,
      successCallback = () => null,
      failureCallback = () => null
    ) => {
      console.log(imageToUpload);

      /**
       * Get path details of the image & the cropped image
       */
      const imageDetails = _.get(imageToUpload, "image.image.node.image");
      const croppedImageDetails = _.get(imageToUpload, "image.croppedImage");

      /**
       * Construct image name
       */
      const imageNameSplit = croppedImageDetails
        ? croppedImageDetails.path.split("/")
        : imageDetails.uri.split("/");
      const imageName = imageNameSplit[imageNameSplit.length - 1];

      /**
       * Construct the image path from the cropped/original image
       */
      const imagePath = croppedImageDetails
        ? croppedImageDetails.path
        : Platform.OS === constants.platformIos
          ? imageDetails.uri // must remove the `file://` prefix from ios images
          : imageDetails.uri;

      const mimeType = croppedImageDetails
        ? croppedImageDetails.mime
        : "mime.lookup(imageDetails.uri)" || "file/jpeg";

      console.log(mimeType);

      const itineraryId = storeService.itineraries.selectedItineraryId;
      const requestObject = {
        id: storyId,
        imageName,
        itineraryId,
        type: journalLevels.story
      };
      apiCall(constants.getStoryImageSignedUrl, requestObject)
        .then(response => {
          if (response.status === constants.responseSuccessStatus) {
            const { imageId, signedUrl } = response.data;
            imageUploader(imagePath, signedUrl)
              .then(() => {
                console.log("upload success");
              })
              .catch(() => {
                console.error("upload failed");
              });
          } else {
            failureCallback();
          }
        })
        .catch(err => {
          failureCallback();
          console.log(err);
        });
    };

    const getImageToUpload = () => {
      if (this.imageUploadQueue.length) {
        const imageQueue = this.imageUploadQueue[0];
        const imageToUpload = imageQueue.imagesList.find(
          imageDetails => !imageDetails.isUploaded
        );
        uploadImage(imageQueue.storyId, imageToUpload, () => {}, () => {});
      }
    };

    getImageToUpload();
  };
}

export default Journal;
