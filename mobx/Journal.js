import { observable, computed, action, toJS } from "mobx";
import constants from "../constants/constants";
import { hydrate } from "./Store";
import { persist } from "mobx-persist";
import { createTransformer } from "mobx-utils";
import { logError } from "../Services/errorLogger/errorLogger";
import apiCall from "../Services/networkRequests/apiCall";
import storeService from "../Services/storeService/storeService";
import _ from "lodash";
const uuidv4 = require("uuid/v4");
import imageUploader from "../Services/imageUploader/imageUploader";

const journalLevels = {
  page: "PAGE",
  story: "STORY",
  journal: "JOURNAL"
};

const journalImageTypes = {
  coverImage: "COVER_IMAGE",
  otherImage: "OTHERS"
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
    return new Promise((resolve, reject) => {
      const itineraryId = storeService.itineraries.selectedItineraryId;
      this._isHomeScreenLoading = true;
      apiCall(
        `${constants.getJournalScreenDetails}?itineraryId=${itineraryId}`,
        {},
        "GET"
      )
        .then(response => {
          debugger;
          this._isHomeScreenLoading = false;
          if (response.status === constants.responseSuccessStatus) {
            this._homeScreenDetails = _.get(response, "data.conf");
            if (response.data.initialized) {
              this.refreshJournalInformation()
                .then(resolve)
                .catch(reject);
            } else {
              resolve();
            }
            this._homeScreenError = false;
          } else {
            this._homeScreenError = true;
            reject();
          }
        })
        .catch(() => {
          this._isHomeScreenLoading = false;
          this._homeScreenError = true;
          reject();
        });
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
  refreshJournalInformation = () => {
    return new Promise((resolve, reject) => {
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
            resolve();
          } else {
            reject();
            this._journalRefreshError = true;
          }
        })
        .catch(() => {
          reject();
          this._isJournalRefreshing = false;
          this._journalRefreshError = true;
        });
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
  get journalTitle() {
    if (_.isEmpty(this.journalDetails)) {
      return "";
    }
    return _.get(this.journalDetails, "journal.title");
  }

  @computed
  get journalDesc() {
    if (_.isEmpty(this.journalDetails)) {
      return "";
    }
    return _.get(this.journalDetails, "journal.desc");
  }

  @computed
  get journalDetails() {
    return toJS(this._journalDetails);
  }

  @computed
  get isJournalInitialized() {
    if (_.isEmpty(this.journalDetails)) {
      return false;
    }
    return this.journalDetails.initialized;
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

  @computed
  get activeStories() {
    if (_.isEmpty(this.journalDetails)) {
      return [];
    }
    try {
      return this.journalDetails.journal.pages.flatMap(page => {
        return page.stories.filter(story => {
          return story.initialized;
        });
      });
    } catch (e) {
      logError(e);
      return [];
    }
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
  updateJournalTitle = ({ title, desc }) => {
    return new Promise((resolve, reject) => {
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
            this.refreshJournalInformation()
              .then(resolve)
              .catch(reject);
          } else {
            reject();
            this._isJournalTitleError = true;
          }
        })
        .catch(() => {
          reject();
          this._isJournalTitleLoading = false;
          this._isJournalTitleError = true;
        });
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
   * Writing Stories
   */
  @action
  submitStory = (storyId, title, richText) => {
    return new Promise((resolve, reject) => {
      const itineraryId = storeService.itineraries.selectedItineraryId;
      const requestObject = {
        data: [
          {
            key: "title",
            value: title
          },
          {
            key: "storyRichText",
            value: richText
          }
        ],
        id: storyId,
        itineraryId,
        type: journalLevels.story
      };
      apiCall(constants.updateJournalDetails, requestObject)
        .then(response => {
          if (response.status === constants.responseSuccessStatus) {
            this.refreshJournalInformation()
              .then(resolve)
              .catch(reject);
          } else {
            reject();
          }
        })
        .catch(() => {
          reject();
        });
    });
  };

  /**
   * Creating a new story for the journal
   */
  createNewStory = pageId => {
    return new Promise((resolve, reject) => {
      const itineraryId = storeService.itineraries.selectedItineraryId;
      const requestObject = {
        itineraryId,
        journalId: this.journalId,
        pageId
      };
      apiCall(constants.journalStoryOperations, requestObject)
        .then(response => {
          if (response.status === constants.responseSuccessStatus) {
            const createdStory = response.data;
            this.refreshJournalInformation()
              .then(() => {
                resolve(createdStory.storyId);
              })
              .catch(reject);
          } else {
            reject();
          }
        })
        .catch(() => {
          reject();
        });
    });
  };

  /**
   * Maintaining the Images List and the upload queue
   */

  @persist("list")
  @observable
  _imageUploadQueue = [];

  @persist("object")
  @observable
  _failedImageUploads = {};

  @computed
  get imageUploadQueue() {
    return toJS(this._imageUploadQueue);
  }

  @action
  addImagesToQueue = (storyId, imagesList = []) => {
    try {
      this._imageUploadQueue.push({
        isQueueRunning: false,
        storyId,
        imagesList: imagesList.map(image => ({
          image,
          isUploaded: false,
          hasFailed: false
        }))
      });
      this.startImageUploadQueue();
    } catch (error) {
      logError("Failed to create image upload queue", { error });
    }
  };

  @action
  startImageUploadQueue = () => {
    const uploadImage = (storyId, imageToUpload) => {
      return new Promise((resolve, reject) => {
        /**
         * Get path details of the image & the cropped image
         */
        const imageDetails = _.get(imageToUpload, "image.image.node.image");
        const croppedImageDetails = _.get(imageToUpload, "image.croppedImage");

        const isImageContained = _.get(imageToUpload, "image.isContain");

        /**
         * Construct image name
         */
        const imageName = `${uuidv4()}.jpg`;

        /**
         * Construct the image path from the cropped/original image
         * Currently - using the original image.
         */
        const imagePath = imageDetails.uri;

        const itineraryId = storeService.itineraries.selectedItineraryId;

        const requestObject = {
          id: storyId,
          imageName,
          itineraryId,
          type: journalLevels.story
        };

        apiCall(constants.getStoryImageSignedUrl, requestObject)
          .then(signedUrlResponse => {
            if (signedUrlResponse.status === constants.responseSuccessStatus) {
              const { imageId, signedUrl } = signedUrlResponse.data;
              imageUploader(imagePath, signedUrl)
                .then(() => {
                  const confirmationRequestObject = {
                    id: storyId,
                    image: {
                      contained: isImageContained,
                      imageId
                    },
                    imageType: journalImageTypes.otherImage,
                    itineraryId: itineraryId,
                    type: journalLevels.story
                  };

                  if (croppedImageDetails) {
                    confirmationRequestObject.image.dimensions = {
                      ...croppedImageDetails.cropRect
                    };
                  }

                  apiCall(
                    constants.journalImageDetails,
                    confirmationRequestObject,
                    "PUT"
                  )
                    .then(confirmationResponse => {
                      if (
                        confirmationResponse.status ===
                        constants.responseSuccessStatus
                      ) {
                        resolve();
                      } else {
                        logError("Failed to confirm imageUpload", {
                          storyId,
                          imageId,
                          imagePath,
                          signedUrl,
                          imageDetails: JSON.stringify(imageToUpload)
                        });
                      }
                    })
                    .catch(() => {
                      logError("Failed to confirm imageUpload", {
                        storyId,
                        imageId,
                        imagePath,
                        signedUrl,
                        imageDetails: JSON.stringify(imageToUpload)
                      });
                      reject();
                    });
                })
                .catch(() => {
                  logError("Failed to upload journal image to S3", {
                    storyId,
                    imageId,
                    imagePath,
                    signedUrl,
                    imageDetails: JSON.stringify(imageToUpload)
                  });
                  reject();
                });
            } else {
              logError("Failed to get signed URL for the image", {
                storyId,
                imagePath,
                imageDetails: JSON.stringify(imageToUpload)
              });
              reject();
            }
          })
          .catch(err => {
            reject();
          });
      });
    };

    const getImageToUpload = () => {
      if (this._imageUploadQueue.length) {
        const imageQueue = this._imageUploadQueue[0];

        const imageToUpload = imageQueue.imagesList[0];
        const imageIndex = 0;

        uploadImage(imageQueue.storyId, imageToUpload)
          .then(() => {
            imageToUpload.isUploaded = true;
            this._imageUploadQueue[0].imagesList[imageIndex] = imageToUpload;
          })
          .catch(() => {
            imageToUpload.hasFailed = true;
            this._imageUploadQueue[0].imagesList[imageIndex] = imageToUpload;
          });
      }
    };

    getImageToUpload();
  };
}

export default Journal;
