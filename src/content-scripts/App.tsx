import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  Show,
} from 'solid-js';
import { InsertFunc } from './emoji';
import { EmojiList } from './EmojiList';

export const App: Component<{
  inputEl: HTMLInputElement;
  insert: InsertFunc;
}> = ({ inputEl, insert }) => {
  const [value, setValue] = createSignal('');
  const [query, setQuery] = createSignal('');
  const [show, setShow] = createSignal(false);

  const setQueryListener = () => {
    setValue(inputEl.value);

    let idx = -1;
    for (let i = inputEl.value.length; i >= 0; i--) {
      const char = inputEl.value[i];
      if (char === ':') {
        idx = i;
        break;
      }
    }

    const queryValue = inputEl.value.slice(idx);
    if (queryValue === query()) return;
    console.log({ queryValue, idx });

    setQuery(queryValue);
  };

  onMount(() => {
    inputEl.addEventListener('keyup', setQueryListener);
  });

  onCleanup(() => {
    inputEl.removeEventListener('keyup', setQueryListener);
  });

  createEffect(() => {
    const shouldShow = value().includes(':');
    setShow(shouldShow);
  });

  const insertWrapper = (emoji: string, replace: string) => {
    insert(emoji, replace);
    setShow(false);
    setQuery('');
  };

  return (
    <Show when={show()}>
      <EmojiList query={query()} insert={insertWrapper} />
    </Show>
  );
};
