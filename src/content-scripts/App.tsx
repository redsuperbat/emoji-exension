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
}> = (props) => {
  const [value, setValue] = createSignal('');
  const [query, setQuery] = createSignal('');
  const [show, setShow] = createSignal(false);

  const setQueryListener = () => {
    setValue(props.inputEl.value);

    let idx = -1;
    for (let i = props.inputEl.value.length; i >= 0; i--) {
      const char = props.inputEl.value[i];
      if (char === ':') {
        idx = i;
        break;
      }
    }

    const queryValue = props.inputEl.value.slice(idx).trim();
    if (queryValue === query()) return;

    setQuery(queryValue);
  };

  onMount(() => {
    props.inputEl.addEventListener('keyup', setQueryListener);
  });

  onCleanup(() => {
    props.inputEl.removeEventListener('keyup', setQueryListener);
  });

  createEffect(() => {
    const shouldShow = value().includes(':');
    setShow(shouldShow);
  });

  const insertWrapper = (emoji: string, replace: string) => {
    props.insert(emoji, replace);
    setShow(false);
    setQuery('');
  };

  return (
    <Show when={show()}>
      <EmojiList query={query()} insert={insertWrapper} />
    </Show>
  );
};
