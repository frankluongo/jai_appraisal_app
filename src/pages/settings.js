import React, { Component } from 'react';
import { ContentContainer, AsideContent, MainContent } from '../assets/styles/Layout/layout';
import { PreviewElement, PreviewElementImage, PreviewText } from '../assets/styles/Settings/styles';
import { UILabel } from '../assets/styles/UI/form';
import Form from '../modules/forms';

const settings = window.require('electron-settings');
const fs = window.require('fs');
const { dialog } = window.require('electron').remote;

const formInputs = [
  { type: "text", label: "Company Name:", name: "companyName" },
  { type: "text", label: "Address Line 1:", name: "companyAddressLine1" },
  { type: "text", label: "Address Line 2:", name: "companyAddressLine2" },
  { type: "text", label: "Phone Number", name: "companyPhone" },
  { type: "text", label: "Website", name: "companyWebsite" },
  { type: "text", label: "Appraiser Title", name: "companyAppraiserTitle" },
  { type: "upload", label: "Logo", name: "companyLogoImage", filename: "logo", },
  { type: "upload", label: "Header Image", name: "companyHeaderImage", filename: "header", },
];

export class Settings extends Component {

  state = {
    companyName: settings.get('companyName') || '',
    companyAddressLine1: settings.get('companyAddressLine1') || '',
    companyAddressLine2: settings.get('companyAddressLine2') || '',
    companyPhone: settings.get('companyPhone') || '',
    companyWebsite: settings.get('companyWebsite') || '',
    companyAppraiserTitle: settings.get('companyAppraiserTitle') || '',
    companyLogoImage: settings.get('companyLogoImage') || '',
    companyHeaderImage: settings.get('companyHeaderImage') || '',
    companyWatermark: settings.get('companyWatermark') || '',
    //companySignature: settings.get('companySignature') || '',
    //companyGradingScale: settings.get('companyGradingScale') || '',
    //companyQualificationsText: settings.get('companyQualificationsText') || '',
  }

  componentDidMount() {
    let preview = document.querySelector('[data-js="PreviewElement"]');
    this.renderPreview(preview);

    window.addEventListener('resize', () => {
      this.renderPreview(preview)
    });
  }

  handleChange = (event) => {
    let currentItem = event.target;
    let currentSetting = currentItem.getAttribute('data-js');
    let currentVal = currentItem.value;

    settings.set(currentSetting, currentVal);
    this.setState({
      [currentSetting]: currentVal
    });
  }

  fileSubmitChange = (event) => {
    let image = event.target.value;
    settings.set('companyLogoImage', image);
    this.setState({
      logoImage: image
    });
    console.log(this.state);
  }

  selectFile = (event) => {
    const button = event.target;
    const file = this.openFileDialog();

    const fileName = button.getAttribute('data-filename');
    const settingName = button.getAttribute('data-js');

    if (!file) {
      return;
    }
    const selectedFile = file[0];
    const fileType = this.getFileType(selectedFile);
    const fileData = fs.readFileSync(selectedFile);

    const finalPathForFS = `./public/assets/${fileName}.${fileType}`;
    const finalPathForApp = `/assets/${fileName}.${fileType}`;

    fs.writeFile(finalPathForFS, fileData, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });

    settings.set(settingName, finalPathForApp);

    this.setState({
      [settingName]: finalPathForApp
    });
  }

  openFileDialog = () => {
    return dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{
        extensions: ['jpg', 'png', 'jpeg']
      }]
    });
  }

  getFileType = (file) => {
    let split = file.split(".");
    let length = split.length - 1;
    let fileType = split[length]
    return fileType;
  }

  // Renders

  renderPreview = (preview) => {
    let width = preview.clientWidth;
    let height = width * 1.294117647;
    preview.style.height = `${height}px`;
  }

  render() {

    return (
      <ContentContainer>
        <AsideContent>
          {formInputs.map((formItem, index) => {
            let nameString = `${formItem.name}`;

            return (
              <Form
                key={index}
                hasLabel={true}
                formName={formItem.label}
                placeholder={this.state[nameString]}
                handleChange={this.handleChange}
                datajs={formItem.name}
                type={formItem.type}
                imageLink={this.state[`${formItem.name}`]}
                selectFile={this.selectFile}
                FileName={formItem.filename}
              />
            )
          }
          )}
        </AsideContent>
        <MainContent>
          <UILabel>Letterhead Preview</UILabel>
          <PreviewElement data-js="PreviewElement">
            <PreviewElementImage src={this.state.companyHeaderImage} alt="Letterhead" />
            <PreviewText>
              {this.state.companyAddressLine1} • {this.state.companyAddressLine2}<br />
              {this.state.companyPhone} • {this.state.companyWebsite}
            </PreviewText>
          </PreviewElement>
        </MainContent>
      </ContentContainer>
    )
  }
}
