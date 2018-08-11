import React, { Component } from 'react';
import { ContentContainer, AsideContent, MainContent } from '../assets/styles/Layout/layout';
import { UIForm, UIInput, UILabel } from '../assets/styles/UI/form';
import { UIButton, UISubmit } from '../assets/styles/UI/buttons';
import { JewelerListItem, NewJewelerFormWrapper } from '../assets/styles/Jewelers/styles';
import { addNewItem, closeModal, handleAddNewItem, removeItem, editItem } from '../modules/functions';

const settings = window.require('electron-settings');

const formInputs = [
  { type: "text", label: "Company Name", name: "companyname" },
  { type: "text", label: "Contact Name", name: "contactname" },
  { type: "text", label: "Email Address", name: "emailaddress" },
  { type: "text", label: "Phone Number", name: "phonenumber" },
  { type: "text", label: "Fax Number", name: "faxnumber" },
  { type: "text", label: "Address Line 1", name: "addressline1" },
  { type: "text", label: "Address Line 2", name: "addressline2" },
  { type: "text", label: "City", name: "city" },
  { type: "text", label: "State", name: "state" },
  { type: "text", label: "Zipcode", name: "zipcode" },
  { type: "upload", label: "Letterhead", name: "letterhead" },
  { type: "upload", label: "Watermark", name: "watermark" },
];


export class Jewelers extends Component {

  // States
  constructor(props) {
    super(props);

    this.state = {
      jewelers: settings.get('jewelers') || [],
      showModal: false,
      activeIndex: 0,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    formInputs.map((inputItem) => this.setState({ [inputItem.name]: '' }));
  }

  // Actions
  handleAddNewJeweler = (event) => {
    event.preventDefault();
    let inputs = event.target.querySelectorAll('input[type="text"]');
    let newJewelerObject = this.buildNewObject(inputs);

    let jewelersArray = this.state.jewelers;
    jewelersArray.push(newJewelerObject);

    settings.set('jewelers', jewelersArray);

    this.setState({
      jewelers: settings.get('jewelers'),
      showModal: false
    });
  }

  addNewJeweler = () => {
    this.setState({
      showModal: true
    });
  }
  editItem = (event) => {
    event.preventDefault();
    const { jewelers, activeIndex } = this.state;

    let inputs = event.target.querySelectorAll('input[type="text"]');
    let newJewelerObject = this.buildNewObject(inputs);
    let jewelersArray = [...jewelers];
    jewelersArray[activeIndex] = newJewelerObject;
    settings.set('jewelers', jewelersArray);
    this.setState({
      jewelers: settings.get('jewelers')
    });
  }
  setActiveItem = (index) => {
    settings.set('activeIndex', index);
    this.setState({
      activeIndex: settings.get('activeIndex'),
    });
  }
  removeItem = (index) => {
    const { jewelers, activeIndex } = this.state;

    let jewelersCopy = [...jewelers];
    let currentObj = jewelersCopy[activeIndex];
    let newArray = jewelersCopy.filter((index) => index !== currentObj);

    settings.set('jewelers', newArray);

    this.setState({
      jewelers: newArray,
      activeIndex: 0
    })
  }
  closeModal = () => {
    this.setState({
      showModal: false
    });
  }

  handleChange = (event) => {
    const { jewelers, activeIndex } = this.state;

    const target = event.target;
    const value = target.value;
    const name = target.name;

    jewelers[activeIndex][name] = value;

    this.setState({
      [name]: value
    });

  }
  handleSubmit = (event) => {
    console.log(event)
  }

  // Helpers
  buildNewObject = (inputs) => {
    let newJewelerObject = {};

    inputs.forEach((input) => {
      newJewelerObject[`${input.name}`] = input.value;
    });

    return newJewelerObject;
  }

  // Renders

  renderJewelersList = () => {
    const { jewelers, activeIndex } = this.state;

    if (jewelers.length === 0) {
      return ("You have no listed Jewelers. Click the, \"Add New Jeweler\" button to get started!");
    }
    return (
      <div>
        {jewelers.map((jeweler, index) => {
          let isActive = index === activeIndex;
          return (
            <JewelerListItem
              active={isActive}
              key={index}
              onClick={() => { this.setActiveItem(index) }} >
              {jeweler.companyname}
            </JewelerListItem>
          )
        }
        )}
      </div>
    )
  }

  renderJewelerForm = () => {
    return (
      <UIForm onSubmit={this.handleAddNewJeweler}>
        <div onClick={this.closeModal}> x </div>
        {formInputs.map((formItem, index) => {
          return (
            <div key={formItem.name}>
              <UILabel>{formItem.label}</UILabel>
              <UIInput
                className="margin-bottom condensed"
                name={formItem.name}
                type={formItem.type}
                onChange={() => null} />
            </div>
          )
        }
        )}
        <UISubmit className="margin-top" type="submit" value="submit" />

      </UIForm>
    )
  }

  renderJewelerPreview = () => {
    const { jewelers, activeIndex } = this.state;

    if (jewelers.length === 0) {
      return null
    }

    return (
      <div>
        <UIForm onSubmit={this.editItem}>

          {formInputs.map((formItem, index) => {

            let currentName = jewelers[activeIndex][formItem.name];

            return (
              <div key={formItem.name}>
                <UILabel>{formItem.label}</UILabel>
                <UIInput
                  className="margin-bottom condensed"
                  name={formItem.name}
                  type={formItem.type}
                  value={currentName}
                  onChange={this.handleChange} />
              </div>
            )
          }
          )}
          <UISubmit className="margin-top" type="submit" value="Edit" />
        </UIForm>
        <UIButton onClick={() => { this.removeItem() }}> Remove </UIButton>
      </div>
    )
  }

  // JSX

  render() {

    const { showModal } = this.state;

    return (
      <ContentContainer className="small-aside">
        <AsideContent>
          <UIButton
            className="margin-bottom"
            onClick={() => { addNewItem("showModal", this) }}>
            Add new jeweler
          </UIButton>
          {this.renderJewelersList()}
        </AsideContent>

        <MainContent>
          {this.renderJewelerPreview()}
        </MainContent>

        {showModal ? (
          <NewJewelerFormWrapper>
            {this.renderJewelerForm()}
          </NewJewelerFormWrapper>
        ) : (null)}
      </ContentContainer>
    )
  }
}