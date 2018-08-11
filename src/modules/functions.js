// Items

export const addNewItem = (stateName, that) => {
  that.setState({
    [stateName]: true
  });
}

export const handleAddNewItem = (event, that, stateToUpdate, settingName, settings) => {
  event.preventDefault();
  let inputs = Array.from(event.target.querySelectorAll('input'));
  let filteredInputs = filterInputs(inputs);

  let newObject = buildNewObject(filteredInputs);

  let updatedArray = that.state[stateToUpdate];
  updatedArray.push(newObject);
  settings.set(settingName, updatedArray);

  that.setState({
    [stateToUpdate]: settings.get(settingName),
    showModal: false
  });
}

export const editItem = (event, that, settingToUpdate, stateToUpdate, listItemsArray, settings) => {
  event.preventDefault();
  if (that.state.activeIndex) {
    var active = that.state.activeIndex
  }

  let inputs = Array.from(event.target.querySelectorAll('input'));
  let filteredInputs = filterInputs(inputs);

  let newObject = buildNewObject(filteredInputs);
  listItemsArray[active] = newObject;

  settings.set(settingToUpdate, listItemsArray);
  that.setState({
    [stateToUpdate]: settings.get(settingToUpdate)
  })




}

export const removeItem = (that, settingToUpdate, stateToUpdate, listItemsArray, settings) => {
  if (that.state.activeIndex) {
    var active = that.state.activeIndex
  }
  let current = listItemsArray[active];
  let filteredArray = listItemsArray.filter((index) => index !== current);
  settings.set(settingToUpdate, filteredArray);
  settings.set(settingToUpdate, filteredArray);
  that.setState({
    [stateToUpdate]: settings.get(settingToUpdate),
    activeIndex: 0
  });
}

// Helpers

export const filterInputs = (inputs) => {
  let filtered = inputs.filter((input) => {
    return input.getAttribute('type') !== 'submit'
  });
  return filtered;
}

export const buildNewObject = (elements) => {
  let newObject = {};

  elements.forEach((element) => {
    newObject[`${element.name}`] = element.value;
  });

  return newObject;
}

export const closeModal = (stateName, that) => {
  that.setState({
    [stateName]: false
  });
}