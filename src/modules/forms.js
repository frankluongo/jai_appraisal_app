import React, { Component } from 'react';
import { UIForm, UIInput, UILabel, UIUploadForm, UIUploadImage, UIUploadImageWrapper, UIUploadLabel, UIUploadButtonWrapper } from '../assets/styles/UI/form';
import { UIButton, UISubmit } from '../assets/styles/UI/buttons';

class Form extends Component {

  // Constructor, State & Mounts
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  // Form Events
  handleChange = (event) => {
    let currentValue = event.target.value;

    this.setState({
      value: currentValue
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  selectFile = (event) => {
    console.log(event);
  }


  // Actions

  checkForHandler = (passedHandler, handle) => {
    if (passedHandler) {
      return passedHandler
    } else {
      return this[`${handle}`];
    }
  }


  // Render

  render() {
    const props = this.props;
    const handleSubmit = this.checkForHandler(props.handleSubmit, 'handleSubmit');
    const handleChange = this.checkForHandler(props.handleChange, 'handleChange');

    if (props.type === "upload") {
      return (
        <UIUploadForm>

          <UIUploadButtonWrapper>
            {props.hasLabel &&
              <UIUploadLabel>
                {props.formName}
              </UIUploadLabel>
            }
            <UIButton
              data-js={props.datajs}
              data-filename={props.FileName}
              onClick={(event) => { props.selectFile(event) }}> Submit File
            </UIButton>
          </UIUploadButtonWrapper>

          <UIUploadImageWrapper>
            <UIUploadImage src={props.imageLink} alt="Jewelry Appraisals, Inc" />
          </UIUploadImageWrapper>

        </UIUploadForm>
      )
    }

    return (
      <UIForm onSubmit={handleSubmit}>
        {props.hasLabel &&
          <UILabel>{props.formName}</UILabel>
        }

        {props.hasValue ? (
          <UIInput
            type="text"
            value={this.state.value}
            data-js={props.datajs}
            onChange={handleChange}
          />
        ) : (
            <UIInput
              type="text"
              data-js={props.datajs}
              placeholder={props.placeholder}
              onChange={handleChange}
            />
          )}

        {props.hasSubmit &&
          <UISubmit
            type="submit"
            value="Submit"
          />
        }
      </UIForm>
    )
  }
}

export default Form;