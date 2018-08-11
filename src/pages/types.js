import React, { Component } from 'react';
import { ContentContainer, AsideContent, AsideListItem, MainContent, Modal } from '../assets/styles/Layout/layout';
import { UIForm, UIInput, UILabel } from '../assets/styles/UI/form';
import { UIButton, UISubmit } from '../assets/styles/UI/buttons';
import { addNewItem, closeModal, handleAddNewItem, removeItem, editItem } from '../modules/functions';

const settings = window.require('electron-settings');

const formInputs = [
  { type: "text", label: "Description", name: "description" },
  { type: "text", label: "Transmittal Letter", name: "transmittal" },
  { type: "text", label: "Cover Letter", name: "coverletter" },
  { type: "text", label: "Statement of Limited Liability", name: "liability" },
  { type: "text", label: "Disclaimer", name: "disclaimer" },
];

export class Types extends Component {

  // States
  constructor(props) {
    super(props);

    this.state = {
      appraisals: settings.get('appraisals') || [],
      showModal: false,
      activeIndex: 0,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    formInputs.map((inputItem) => this.setState({ [inputItem.name]: '' }));
  }

  // Actions

  setActiveItem = (index) => {
    settings.set('activeIndex', index);
    this.setState({
      activeIndex: settings.get('activeIndex'),
    });
  }

  handleChange = (event) => {
    const { appraisals, activeIndex } = this.state;

    const target = event.target;
    const value = target.value;
    const name = target.name;

    appraisals[activeIndex][name] = value;

    this.setState({
      [name]: value
    });

  }

  // Renders

  renderAddNewForm = () => {
    return (
      <UIForm onSubmit={(event) => handleAddNewItem(event, this, "appraisals", "appraisals", settings)}>
        <div onClick={() => closeModal("showModal", this)}> x </div>
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

  renderPreview = () => {
    const { appraisals, activeIndex } = this.state;

    if (appraisals.length === 0) {
      return null
    }

    return (
      <div>
        <UIForm onSubmit={(event) => { editItem(event, this, 'appraisals', 'appraisals', appraisals, settings) }}>

          {formInputs.map((formItem, index) => {

            let currentName = appraisals[activeIndex][formItem.name];

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
        <UIButton onClick={() => { removeItem(this, "appraisals", "appraisals", appraisals, settings) }}> Remove </UIButton>
      </div>
    )
  }

  // JSX

  render() {

    const { appraisals, showModal, activeIndex } = this.state;

    return (
      <ContentContainer className="small-aside">
        <AsideContent>
          <UIButton
            className="margin-bottom"
            onClick={() => { addNewItem("showModal", this) }}>
            Add New Appraisal Type
          </UIButton>
          {appraisals.map((appraisal, index) => {
            let isActive = index === activeIndex;
            return (
              <AsideListItem
                active={isActive}
                key={index}
                onClick={() => { this.setActiveItem(index) }} >
                {appraisal.description}
              </AsideListItem>
            )
          }
          )}
        </AsideContent>

        <MainContent>
          {this.renderPreview()}
        </MainContent>

        {showModal ? (
          <Modal>
            {this.renderAddNewForm()}
          </Modal>
        ) : (null)}
      </ContentContainer>
    )
  }
}