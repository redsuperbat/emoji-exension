import {
  Component,
  createEffect,
  createSignal,
  For,
  onCleanup,
  onMount,
} from 'solid-js';
import { Emoji, InsertFunc } from './emoji';
import { EmojiListItem } from './EmojiListItem';
import { emojis } from './emojis';

export const EmojiList: Component<{
  query: string;
  insert: InsertFunc;
}> = (props) => {
  const max = 15;
  const [selectedEmojis, setEmojis] = createSignal<Emoji[]>([]);
  const [focusedIndex, setFocusedIndex] = createSignal<number>(0);

  const onArrowKeys = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      props.insert(selectedEmojis()[focusedIndex()].character, props.query);
    }
    if (e.key === 'ArrowUp') {
      if (focusedIndex() === 0) return;
      setFocusedIndex((idx) => idx - 1);
    }
    if (e.key === 'ArrowDown') {
      if (focusedIndex() === selectedEmojis().length - 1) return;
      setFocusedIndex((idx) => idx + 1);
    }
  };

  onMount(() => {
    window.addEventListener('keyup', onArrowKeys);
  });
  onCleanup(() => {
    window.removeEventListener('keyup', onArrowKeys);
  });

  createEffect(() => {
    const filteredEmojis = emojis
      .filter(({ slug }) => slug.startsWith(props.query.slice(1)))
      .slice(0, max);

    setEmojis(filteredEmojis);
  });

  return (
    <div class="bg-white rounded-md z-[999] shadow-md">
      <For
        each={selectedEmojis()}
        children={(emoji, idx) => (
          <div
            class="cursor-pointer"
            onClick={() => props.insert(emoji.character, props.query)}
          >
            <EmojiListItem
              emoji={emoji}
              focused={idx() === focusedIndex()}
              query={props.query}
            />
          </div>
        )}
      />
    </div>
  );
};
