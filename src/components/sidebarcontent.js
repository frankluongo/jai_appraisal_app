import React, { Component } from 'react';

import { displayPage } from './utilities';

const listItems = [
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

export class SidebarContent extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  pageRender = (settingName) => {
    let mainContent = document.querySelector('[data-js="MainContent"]');
    let pageToRender = displayPage(settingName);
    console.log(pageToRender);
    //mainContent.appendChild(displayPage(pageToRender));
  }

  createList = (props) => {

    console.log(props)

    let list = [];
    let listItemsLength = listItems.length;

      for(let i = 0; i < listItemsLength; i++) {
        let currentItem = listItems[i];
        list.push(
          <li
            key={i}
            onClick={() => this.pageRender(currentItem.settingName)}
          >
            {currentItem.page}
          </li>
        );
      }

    return list;
  }

  render(props) {

    this.props = props;

    return (
      <div className="sidebar-content">
        <ul className="sidebar-content__list">
          {this.createList(this.props)}
        </ul>
      </div>
    )
  }

}