import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Store from 'Utils/storeswitcher';
import TagManager from 'react-gtm-module';
import * as svg4everybody from 'svg4everybody/dist/svg4everybody';

import React from 'react';
import ReactDOM from 'react-dom';

Store.getStoreLib().then(
    () => {
        import(
            /* webpackMode: "lazy" */
            /* webpackPreload: true */
            /* webpackChunkName: "App" */
            './App'
        ).then(AppModule => {
            const App = AppModule.default;
            const tagManagerArgs = {
                gtmId: '',
                dataLayer: {userProject: 'ROBT'}
            };

            svg4everybody();
            TagManager.initialize(tagManagerArgs);

            ReactDOM.render(
                <App />,
                document.querySelector('#root')
            );
        });
    }
);