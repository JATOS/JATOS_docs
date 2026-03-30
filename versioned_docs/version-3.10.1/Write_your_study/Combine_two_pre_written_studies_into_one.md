---
title: Combine two pre-written studies into one
slug: /Combine-two-pre-written-studies-into-one.html
sidebar_position: 3
---

**Take two separate studies and combine them into a single one** 

You might have created different parts of a study using various tools—for example, a survey coded with [lab.js](labjs-and-JATOS.html) and a perceptual experiment with [OSWeb](OSWeb-and-JATOS.html). If you have separate `.jzip` files from each tool and now wish to combine them into one study, here's how to do it.

This process applies to combining any two study halves, regardless of how they were coded. (However, if you directly wrote the scripts instead of using an experiment builder, you likely won't need these specific instructions.)

-----

### Ingredients

To combine two studies into one, you will need the following:

1.  A [**local JATOS**](Installation.html#easy-installation-on-your-local-computer). This will give you easy access to move and rename your files. 
2.  Information on your study assets' location: Go to [http://localhost:9000/jatos](http://localhost:9000/jatos). On the homepage, locate the section titled "Where are my files" (it's prominently displayed). Find this corresponding folder on your computer.
3.  The `.jzip` file for the first half of your study.
4.  The `.jzip` file for the second half of your study.

**Note for items 3 and 4:** You should not attempt to generate a `.jzip` file manually at this stage (though it is technically possible). A [JZIP study archive](JATOS-Study-Archive-JZIP.html) file is a ZIP archive with a standardized content structure, containing essential information that JATOS needs to recognize it as a study.

-----

### Strategy

The approach involves two main steps: first, import one half of the study into your local JATOS instance. Then, integrate the files from the second half as an additional component within the first study.

-----

### Steps

These steps may sound intricate, but they primarily involve straightforward clicking, copying, and pasting—essentially, creating a JATOS study collage.

Let's assume you have `half-study-1.jzip` (a survey) and `half-study-2.jzip` (a perceptual task).

1.  Import `half-study-1.jzip` into JATOS. This should result in one study with a single component.
2.  Identify the folder on your local computer where these study assets are located (as described in Ingredient 2).
3.  Import `half-study-2.jzip` into JATOS. This should also result in one study with a single component.
4.  Navigate into the subfolder corresponding to `half-study-2` within the directory you identified in Step 2. You should find a single `.html` file (which displays your study) and likely many other assets, including libraries and CSS stylesheets.
5.  In your local JATOS GUI: Go to the **component properties** of each of your study halves. Locate the field containing the path to the HTML file that runs your study. If both halves use the same HTML file name (e.g., `index.html`), change one of the names. For instance, rename them to `index-half-1.html` and `index-half-2.html`. JATOS will update the actual file name on your file system for you (confirm when prompted).
6.  In your local file system: Copy all the contents from the `half-study-2` subfolder into the `half-study-1` subfolder. You have now combined the assets from both studies into a single folder and ensured that the HTML files have unique names.
7.  In your local JATOS GUI: Go to your `half-study-1`. Click on "**New component**". In the properties of this new component, specify the path to the HTML file from `half-study-2` (e.g., `index-half-2.html`). Copy any other relevant properties (e.g., *study input* or *component input*) from the single component in `half-study-2` to this new component in `half-study-1`.
8.  You now have a complete, combined study.

-----

### Troubleshooting

Ensure that your study does not finish after the first component. In the JavaScript of the first component, you should see something similar to:

```javascript
jatos.startNextComponent(myResultDataObject);
```

And **not** something like:

```javascript
jatos.endStudy(myResultDataObject);
```
