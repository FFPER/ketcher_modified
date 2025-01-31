import { test } from '@playwright/test';
import {
  takeEditorScreenshot,
  waitForPageInit,
  openFileAndAddToCanvas,
  selectFormatForSaving,
  clickOnSaveFileAndOpenDropdown,
} from '@utils';

test.describe('Saving in .png files', () => {
  test.beforeEach(async ({ page }) => {
    await waitForPageInit(page);
  });
  const testData1 = [
    {
      filename: 'KET/unsplit-nucleotides-connected-with-nucleotides.ket',
      description: 'unsplit-nucleotides-connected-with-nucleotides',
    },
    {
      filename: 'KET/unsplit-nucleotides-connected-with-chems.ket',
      description: 'connection nucleotides with chems',
    },
    {
      filename: 'KET/unsplit-nucleotides-connected-with-bases.ket',
      description: 'unsplit-nucleotides-connected-with-bases',
    },
    {
      filename: 'KET/unsplit-nucleotides-connected-with-sugars.ket',
      description: 'unsplit-nucleotides-connected-with-sugars',
    },
    {
      filename: 'KET/unsplit-nucleotides-connected-with-phosphates.ket',
      description: 'unsplit-nucleotides-connected-with-phosphates',
    },
    {
      filename: 'KET/unsplit-nucleotides-connected-with-peptides.ket',
      description: 'unsplit-nucleotides-connected-with-peptides',
    },
  ];

  for (const { filename, description } of testData1) {
    test(`Export to PNG: Verify it is possible to export ${description} to PNG`, async ({
      page,
    }) => {
      await openFileAndAddToCanvas(filename, page);
      await takeEditorScreenshot(page);
      await clickOnSaveFileAndOpenDropdown(page);
      await selectFormatForSaving(page, 'PNG Image');
      await takeEditorScreenshot(page);
    });
  }

  test(`Verify it is possible to export the simple schema with retrosynthetic arrow to PNG`, async ({
    page,
  }) => {
    /*
    Test case: #2096
    Description: Validate that schema with retrosynthetic arrow could be saved to PNG
    */
    await openFileAndAddToCanvas(
      'KET/simple-schema-with-retrosynthetic-arrow.ket',
      page,
    );

    await clickOnSaveFileAndOpenDropdown(page);
    await selectFormatForSaving(page, 'PNG Image');
    await takeEditorScreenshot(page);
  });

  test(`Verify it is possible to export the schema with retrosynthetic, angel arrows and plus to PNG`, async ({
    page,
  }) => {
    /*
    Test case: #2096
    Description: Validate that schema with retrosynthetic arrow could be saved to PNG
    */
    await openFileAndAddToCanvas(
      'KET/schema-with-retrosynthetic-angel-arrows-and-plus.ket',
      page,
    );

    await clickOnSaveFileAndOpenDropdown(page);
    await selectFormatForSaving(page, 'PNG Image');
    await takeEditorScreenshot(page);
  });

  test(`Verify it is possible to export the schema with vertical retrosynthetic arrow to PNG`, async ({
    page,
  }) => {
    /*
    Test case: #2096
    Description: Validate that schema with retrosynthetic arrow could be saved to PNG
    */
    await openFileAndAddToCanvas(
      'KET/schema-with-vertical-retrosynthetic-arrow.ket',
      page,
    );
    await clickOnSaveFileAndOpenDropdown(page);
    await selectFormatForSaving(page, 'PNG Image');
    await takeEditorScreenshot(page);
  });

  test(`Verify it is possible to export the schema with two retrosynthetic arrows to PNG`, async ({
    page,
  }) => {
    /*
    Test case: #2096
    Description: Validate that schema with retrosynthetic arrow could be saved to PNG
    */
    await openFileAndAddToCanvas(
      'KET/schema-with-two-retrosynthetic-arrows.ket',
      page,
    );

    await clickOnSaveFileAndOpenDropdown(page);
    await selectFormatForSaving(page, 'PNG Image');
    await takeEditorScreenshot(page);
  });

  test(`Verify it is possible to export the schema with diagonaly retrosynthetic arrow to PNG`, async ({
    page,
  }) => {
    /*
    Test case: #2096
    Description: Validate that schema with retrosynthetic arrow could be saved to PNG
    */
    await openFileAndAddToCanvas(
      'KET/schema-with-diagonal-retrosynthetic-arrow.ket',
      page,
    );

    await clickOnSaveFileAndOpenDropdown(page);
    await selectFormatForSaving(page, 'PNG Image');
    await takeEditorScreenshot(page);
  });

  test(`Verify it is possible to export the schema reverse retrosynthetic arrow and pluses to PNG`, async ({
    page,
  }) => {
    /*
    Test case: #2096
    Description: Validate that schema with retrosynthetic arrow could be saved to PNG
    */
    await openFileAndAddToCanvas(
      'KET/schema-with-reverse-retrosynthetic-arrow-and-pluses.ket',
      page,
    );

    await clickOnSaveFileAndOpenDropdown(page);
    await selectFormatForSaving(page, 'PNG Image');
    await takeEditorScreenshot(page);
  });
});
