import React from "react";
import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import GCMViewer from "./GCMViewer";
import GCMTripDetails from "./GCMTripDetails";
import GCMDepartingFrom from "./GCMDepartingFrom";
import GCMRequestCallback from "./GCMRequestCallback";

const GCMFormTestCases: ITestCase[] = [
  {
    title: "GCM Trip details form",
    Component: (
      <GCMViewer
        bannerImage={
          "https://pickyourtrail-guides-images.imgix.net/misc/hungary.jpeg"
        }
        backAction={() => {}}
        title={"4 nights to Kuta and Ubud"}
      >
        <GCMTripDetails />
      </GCMViewer>
    )
  },
  {
    title: "GCM Departing form",
    Component: (
      <GCMViewer
        bannerImage={
          "https://pickyourtrail-guides-images.imgix.net/misc/hungary.jpeg"
        }
        backAction={() => {}}
        title={"4 nights to Kuta and Ubud"}
      >
        <GCMDepartingFrom />
      </GCMViewer>
    )
  },
  {
    title: "GCM Request Call back",
    Component: (
      <GCMViewer
        bannerImage={
          "https://pyt-images.imgix.net/images/web_app/homepage/talk_to_us_v2.jpg"
        }
        backAction={() => {}}
        title={"Have questions? We’ll call you back"}
      >
        <GCMRequestCallback />
      </GCMViewer>
    )
  }
];

export default GCMFormTestCases;
