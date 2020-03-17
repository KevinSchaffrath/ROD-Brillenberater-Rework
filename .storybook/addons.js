import '@storybook/addon-backgrounds/register';
import '@storybook/addon-viewport/register';
import '@storybook/addon-knobs/register';

import {Parser as HtmlToReactParser} from 'html-to-react';
import {text} from '@storybook/addon-knobs';
/**
 * JSX Knobs function.
 *
 * @param {String} label      Knobs label.
 * @param {String} defaultVal Default value.
 * @param {String} id         Group id.
 *
 * @returns {JSX} Parsed jsx from string.
 */
export const jsx = (label, defaultVal, id) => {
    const parser = new HtmlToReactParser();

    const area = document.createElement('textarea');
    area.innerHTML = text(label, defaultVal, id);
    const parsed = area.innerText;

    return parser.parse(parsed);
};