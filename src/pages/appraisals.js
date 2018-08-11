import React, { Component } from 'react';
import { ContentContainer, AsideContent, AsideListItem, MainContent, Modal } from '../assets/styles/Layout/layout';
const settings = window.require('electron-settings');

export class Appraisals extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clients: settings.get('clients') || [],
      showModal: false,
      activeIndex: 0,
    }

  }

  render() {
    return (
      <ContentContainer className="small-aside">
        <AsideContent>
          stuff
        </AsideContent>

        <MainContent>
          things
        </MainContent>
      </ContentContainer>
    ) // Return
  } // Render
} // class Appraisals