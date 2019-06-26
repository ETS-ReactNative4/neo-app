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
    hydrate("_imageUploadQueue", storeInstance)
      .then(() => null)
      .catch(err => logError(err));
    hydrate("_imageUploadQueueError", storeInstance)
      .then(() => null)
      .catch(err => logError(err));
  };

  @action
  reset = () => {
    this._homeScreenDetails = {};
    this._journalDetails = {};
    this._imageUploadQueue = [];
    this._imageUploadQueueError = false;
  };

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

  @computed
  get shareIllustration() {
    if (_.isEmpty(this.homeScreenDetails)) return "";
    return _.get(this.homeScreenDetails, "shareImage.imageUrl");
  }

  /**
   * This will fetch details to show in the home screen which will prompt
   * user to create a journal.
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
          this._isHomeScreenLoading = false;
          if (response.status === constants.responseSuccessStatus) {
            this._homeScreenDetails = _.get(response, "data.conf");
            if (response.data.initialized) {
              this.refreshJournalInformation()
                .then(resolve)
                .catch(reject);
            } else {
              this._journalDetails = {};
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

  /**
   * This function Refresh the journal data
   * Usually called after every journal operation.
   */
  @action
  refreshJournalInformation = () => {
    return new Promise((resolve, reject) => {
      const itineraryId = storeService.itineraries.selectedItineraryId;
      this._isJournalRefreshing = true;
      apiCall(
        `${constants.refreshJournalData}?itineraryId=${itineraryId}`,
        {},
        "GET"
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
  get journalCoverImage() {
    if (_.isEmpty(this.journalDetails)) {
      return "";
    }
    return _.get(this.journalDetails, "journal.coverImage.imageUrl");
  }

  @computed
  get journalOwner() {
    if (_.isEmpty(this.journalDetails)) {
      return "";
    }
    return _.get(this.journalDetails, "journal.owner");
  }

  @computed
  get journalPublishedTime() {
    if (_.isEmpty(this.journalDetails)) {
      return "";
    }
    return _.get(this.journalDetails, "journal.publishedTimeStr");
  }

  @computed
  get journalCreatedTime() {
    if (_.isEmpty(this.journalDetails)) {
      return "";
    }
    return _.get(this.journalDetails, "journal.creationTimeStr");
  }

  @computed
  get isJournalPublished() {
    if (_.isEmpty(this.journalDetails)) {
      return "";
    }
    return _.get(this.journalDetails, "journal.published");
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
  get journalUrl() {
    if (_.isEmpty(this.journalDetails)) {
      return "";
    }
    return _.get(this.journalDetails, "journal.url");
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

  /**
   * Returns an array of all the active stories in a journal
   */
  @computed
  get activeStories() {
    if (_.isEmpty(this.journalDetails)) {
      return [];
    }
    try {
      return (_.get(this.journalDetails, "journal.pages") || []).flatMap(
        page => {
          return _.compact(
            page.stories.map(story => {
              if (story.initialized) {
                story.pageId = page.pageId;
                return story;
              }
              return null;
            })
          );
        }
      );
    } catch (e) {
      logError(e);
      return [];
    }
  }

  @computed
  get pages() {
    if (_.isEmpty(this.journalDetails)) {
      return [];
    }
    try {
      return _.get(this.journalDetails, "journal.pages");
    } catch (e) {
      logError(e);
      return [];
    }
  }

  /**
   * Initialize a journal instance for the user
   */
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

  /**
   * Used for editing the journal title & description
   */
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
   * Returns an object with
   * - array of upcoming day's pages
   * - array of completed day's pages
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

  /**
   * Returns an array of all the stories associated with a page
   */
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
   * Submit a created story to the journal
   * Only needs title and richText
   * Images will be uploaded through the image queue
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
            resolve();
            this.refreshJournalInformation();
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
  @action
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
   * Deletes a story using the `storyId`
   */
  @action
  deleteStory = storyId => {
    return new Promise((resolve, reject) => {
      const requestObject = {
        storyId
      };
      apiCall(
        constants.journalDeleteStory.replace(":storyId", storyId),
        requestObject,
        "DELETE"
      )
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
   * Maintaining the Images List and the upload queue
   */

  @persist("list")
  @observable
  _imageUploadQueue = [];

  @persist
  @observable
  _imageUploadQueueError = false;

  @observable _isImageUploadQueueRunning = false;

  @computed
  get imageUploadQueue() {
    return toJS(this._imageUploadQueue);
  }

  @computed
  get isImageUploadQueueRunning() {
    return this._isImageUploadQueueRunning;
  }

  @action
  deleteImage = (storyId, imageId) => {
    return new Promise((resolve, reject) => {
      const itineraryId = storeService.itineraries.selectedItineraryId;
      const requestObject = {
        id: storyId,
        image: {
          imageId
        },
        imageType: journalImageTypes.otherImage,
        itineraryId,
        type: journalLevels.story
      };
      apiCall(constants.journalImageDetails, requestObject, "DELETE")
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
   * Adds another story with images list to the image upload queue
   */
  @action
  addImagesToQueue = (storyId, imagesList = []) => {
    try {
      this._imageUploadQueue.push({
        storyId,
        imagesList: imagesList.map(image => ({
          image,
          failureCount: 0
        })),
        completedImages: []
      });
      /**
       * If the queue is not already running, start the queue
       */
      if (!this.isImageUploadQueueRunning) {
        this.startImageUploadQueue();
      }
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

        /**
         * Get the signed url with which the image must be uploaded.
         */
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

                  /**
                   * Image upload is successful. A confirmation API call is needed to confirm the image details with backend
                   */
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
      console.log("------------------------------");
      console.log(toJS(this._imageUploadQueue));
      console.log("------------------------------");
      if (this._imageUploadQueue.length) {
        const queueIndex = 0;
        const imageQueue = this._imageUploadQueue[queueIndex];

        /**
         * Reset completedImages array
         */
        this._imageUploadQueue[queueIndex].completedImages = [];

        console.log("------------------------------");
        console.log(toJS(imageQueue));
        console.log("------------------------------");

        if (imageQueue.imagesList.length === 0) {
          this._imageUploadQueue.splice(queueIndex, 1);
          this.startImageUploadQueue();
        } else {
          const imageIndex = 0;
          const imageToUpload = imageQueue.imagesList[imageIndex];

          console.log("------------------------------");
          console.log(toJS(imageToUpload));
          console.log("------------------------------");

          uploadImage(imageQueue.storyId, imageToUpload)
            .then(() => {
              /**
               * Successful image upload. Remove that image from the queue
               */
              console.log("Image uploaded! ------------------------------ ");

              /**
               * Push the uploaded image to completed images array,
               * Should be reset every time queue starts since the refresh call will update
               * the data in the journal object
               */
              const completedImage = this._imageUploadQueue[
                queueIndex
              ].imagesList.splice(imageIndex, 1);
              this._imageUploadQueue[queueIndex].completedImages.push(
                completedImage
              );

              this.startImageUploadQueue();
            })
            .catch(() => {
              /**
               * If user is not connected to internet just restart the queue
               * image upload will resume if he gets connected back.
               */
              const isConnectedToInternet = storeService.appState.isConnected;
              if (!isConnectedToInternet) {
                this.startImageUploadQueue();
                return;
              }

              /**
               * In case of some other failures...
               */
              imageToUpload.failureCount++;
              if (imageToUpload.failureCount < 3) {
                this._imageUploadQueue[0].imagesList[
                  imageIndex
                ] = imageToUpload;
              } else {
                this._imageUploadQueueError = true;
                this._imageUploadQueue[0].imagesList.splice(imageIndex, 1);
              }
              this.startImageUploadQueue();
            });
        }
      }
    };

    if (this._imageUploadQueue.length) {
      this.refreshJournalInformation();
      this._isImageUploadQueueRunning = true;
      getImageToUpload();
    } else {
      this._isImageUploadQueueRunning = false;
      this.refreshJournalInformation();
      console.log("------------------------------ ");
      console.log("Queue Complete!");
      console.log("------------------------------ ");
    }
  };

  /**
   * returns an array of images using a pageId and storyId
   */
  getImagesById = createTransformer(({ pageId, storyId }) => {
    try {
      const requiredPage = this.journalDetails.journal.pages.find(
        page => page.pageId === pageId
      );
      const requiredStory = requiredPage.stories.find(
        story => story.storyId === storyId
      );
      if (requiredStory.images) {
        return Object.values(requiredStory.images);
      }
      return [];
    } catch (e) {
      logError(e);
      return [];
    }
  });

  /**
   * Get a story based on the pageId and storyId
   */
  getStoryById = createTransformer(({ pageId, storyId }) => {
    try {
      const requiredPage = this.journalDetails.journal.pages.find(
        page => page.pageId === pageId
      );
      const requiredStory = requiredPage.stories.find(
        story => story.storyId === storyId
      );
      return requiredStory || {};
    } catch (e) {
      logError(e);
      return {};
    }
  });

  storyImageQueueStatus = createTransformer(storyId => {
    try {
      if (this.imageUploadQueue.length) {
        const story = this._imageUploadQueue.find(
          storyDetails => storyId === storyDetails.storyId
        );
        if (story)
          return {
            pendingImages: story.imagesList.length,
            completedImages: story.completedImages.length
          };
        return {
          pendingImages: 0,
          completedImages: 0
        };
      } else {
        return {
          pendingImages: 0,
          completedImages: 0
        };
      }
    } catch (e) {
      logError(e);
      return {
        pendingImages: 0,
        completedImages: 0
      };
    }
  });

  /**
   * Publish Journal
   */
  @action
  publishJournal = () => {
    return new Promise((resolve, reject) => {
      const journalId = this.journalId;
      apiCall(`${constants.publishJournal}?journalId=${journalId}`)
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
}

export default Journal;
