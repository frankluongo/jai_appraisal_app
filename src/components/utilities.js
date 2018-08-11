import React, { Component } from 'react';
import { Settings } from '../pages/settings';

export const displayPage = (current) => {
    if (current === 'appraisals')    return (<div> Appraisals </div>)
    else if (current === 'jewelers') return (<div> Jewelers </div>)
    else if (current === 'types')    return (<div> Types </div>)
    else if (current === 'settings') return (<Settings />)
  }