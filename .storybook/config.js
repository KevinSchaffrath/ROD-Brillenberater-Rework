import React from 'react';
import {configure, addParameters, addDecorator, setAddon} from '@storybook/react';
import chaptersAddon, {setDefaults} from 'react-storybook-addon-chapters';
import {withKnobs} from '@storybook/addon-knobs';
import {withSmartKnobs} from 'storybook-addon-smart-knobs';


import GlobalStyle from '../src/theme/global';

// Disable Theme of Chapters-addon
setDefaults({
    sectionOptions: {
        showSource: false,
        allowSourceToggling: false,
        showPropTables: false,
        allowPropTablesToggling: false,
    }
});

// Set Chapter addon
setAddon(chaptersAddon);

// automatically import all files ending in *.stories.js
const mod = require.context('../src', true, /\.stories\.jsx$/);

// load every story
function loadStories() {
    mod.keys().forEach(filename => mod(filename));
}

// define usable backgrounds for storybook view
addParameters({
    backgrounds: [
        {name: 'white', value: '#ffffff', default: true},
        {name: 'black', value: '#000000'}
    ]
});

// define usable viewports
addParameters({

});

// define a global style for storybook
const withGlobal = (cb) => (
    <>
      <GlobalStyle />
      {cb()}
    </>
);

// add global style to storybook
addDecorator(withGlobal);
addDecorator(withSmartKnobs());
addDecorator(withKnobs);

// initiate storybook
configure(loadStories, module);