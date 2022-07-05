/* @refresh reload */
import { render } from 'solid-js/web';

import { App } from './App';
import './index.css';

const isInputEl = (input: unknown): input is HTMLInputElement =>
  input instanceof HTMLElement &&
  'value' in input &&
  typeof input['value'] === 'string';

document.querySelectorAll('input[type=text]').forEach((input) => {
  if (!isInputEl(input)) {
    return;
  }

  const insert = (emoji: string, replace: string) => {
    input.value = input.value.replaceAll(replace, emoji);
  };

  const mountableEl = document.createElement('div');
  mountableEl.style.position = 'fixed';

  const boundingRect = input.getBoundingClientRect();
  mountableEl.style.left = `${boundingRect.left}px`;
  mountableEl.style.top = `${boundingRect.bottom}px`;

  document.body.appendChild(mountableEl);

  render(() => <App inputEl={input} insert={insert} />, mountableEl);
});
