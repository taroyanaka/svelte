// playwright使いづらいっていうか使いこなせるまで時間かかりそうだから、
// 直接JSで書いていくことにする

import { chromium } from 'playwright';

const runPlaywright = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/');

//   await page.goto('http://localhost:8080/');
//   await page.getByRole('listitem').filter({ hasText: 'tag: tag1, tag10, fetch_insert_tag https://yanaka.dev/ created_at: 2023-06-12T05' }).getByPlaceholder('tag').click();
//   await page.getByRole('listitem').filter({ hasText: 'tag: tag1, tag10, fetch_insert_tag https://yanaka.dev/ created_at: 2023-06-12T05' }).getByPlaceholder('tag').fill('tag100');
//   await page.getByRole('listitem').filter({ hasText: 'tag: fetch_insert_tag https://www.yahoo.co.jp/ created_at: 2023-06-18T11:42:58.6' }).getByRole('button', { name: 'fetch_insert_tag' }).click();

//   await page.screenshot({ path: 'example.png' });
  await browser.close();
};

runPlaywright();


// import { chromium } from 'playwright';

// import { test } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('http://localhost:8080/');
//   await page.getByRole('listitem').filter({ hasText: 'tag: tag1, tag10, fetch_insert_tag https://yanaka.dev/ created_at: 2023-06-12T05' }).getByPlaceholder('tag').click();
//   await page.getByRole('listitem').filter({ hasText: 'tag: tag1, tag10, fetch_insert_tag https://yanaka.dev/ created_at: 2023-06-12T05' }).getByPlaceholder('tag').fill('tag100');
//   await page.getByRole('listitem').filter({ hasText: 'tag: fetch_insert_tag https://www.yahoo.co.jp/ created_at: 2023-06-18T11:42:58.6' }).getByRole('button', { name: 'fetch_insert_tag' }).click();
// });