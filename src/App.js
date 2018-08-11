import React, { Component } from 'react';
import './assets/styles/App.css';
import { Header, AppWrapper, ContentWrapper, PageWrapper, Sidebar } from './assets/styles/Layout/layout';
import { SidebarButton } from './assets/styles/UI/buttons'

import { Settings } from './pages/settings';
import { Jewelers } from './pages/jewelers';
import { Types } from './pages/types';
import { Appraisals } from './pages/appraisals';

const settings = window.require('electron-settings');
// const { ipcRenderer } = window.require('electron');
// const fs = window.require('fs');

const pages = [
  {
    page: "Appraisals",
    settingName: "appraisals"
  },
  {
    page: "Jewelers",
    settingName: "jewelers"
  },
  {
    page: "Types",
    settingName: "types"
  },
  {
    page: "Settings",
    settingName: "settings"
  },
];

class App extends Component {

  state = {
    currentPage: settings.get('currentPage') || 'appraisals'
  }

  // Functions

  createPagesList = () => {

    let list = [];
    let pagesLength = pages.length;

    for (let i = 0; i < pagesLength; i++) {
      let currentPage = pages[i];
      let isCurrent = currentPage.settingName === this.state.currentPage;

      list.push(
        <SidebarButton
          key={i}
          active={isCurrent}
          onClick={() => this.updatePage(currentPage.settingName)}
        >
          {currentPage.page}
        </SidebarButton>
      );
    }

    return list;
  }

  updatePage = (newState) => {
    settings.set('currentPage', newState);
    this.setState({
      currentPage: settings.get('currentPage')
    });
  }

  displayCurrentPage = () => {

    let current = this.state.currentPage;

    if (current === 'appraisals') {
      return (<Appraisals />)
    }
    else if (current === 'jewelers') {
      return (<Jewelers />)
    }
    else if (current === 'types') {
      return (<Types />)
    }
    else if (current === 'settings') {
      return (<Settings />)
    }
  }

  render() {

    return (
      <AppWrapper>
        <Header>
          Jewelry Appraisals, Inc.
        </Header>
        <ContentWrapper>
          <Sidebar>
            {this.createPagesList()}
          </Sidebar>
          <PageWrapper>
            {this.displayCurrentPage()}
          </PageWrapper>
        </ContentWrapper>
      </AppWrapper>
    );
  }
}

export default App;
