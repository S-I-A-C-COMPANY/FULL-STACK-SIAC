import React from "react";
// Layout
import { BannerProfile } from "../BannerProfile/BannerProfile";
import { SectionContactInformation } from "../SectionContactInformation/SectionContactInformation";
import { SectionToProfile } from "../SectionToProfile/SectionToProfile";

export const ContentProfile = () => {
  return (
    <div className="contentProfile">
      <div className="containerProfile">
        <BannerProfile />
        <div className="containersInfomation">
          <SectionContactInformation />
          <SectionToProfile />
        </div>
      </div>
    </div>
  );
};
