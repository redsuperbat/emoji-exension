#!/usr/bin/env zx
import { $, fs } from 'zx';

await $`vite build`;
await fs.copy('manifest.json', './dist/manifest.json');
await fs.copy('./src/assets/emojis.json', './dist/assets/emojis.json');
