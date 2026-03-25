---
title: Customize JATOS' Home Page
slug: /Customize-JATOS-Home-Page.html
sidebar_position: 5
---

## Link to Terms of Use

You can configure JATOS to show a link to your 'Terms of Use' in an info box on the home page.

In your JATOS installation folder, edit `conf/jatos.conf` (or `conf/production.conf` in versions < 3.8.3) and add the URL under `jatos.termsOfUseUrl`. If left empty, the info box is not shown.

## Welcome Block

You can customize JATOS' home page to, for example:
* show your university's logo,
* add some introduction text, or
* announce an upcoming event.

This is done by configuring JATOS with a URL that points to some static HTML describing your individual welcome block. This HTML block will then be loaded and displayed on every home page.

Have a look at this [example welcome block](https://github.com/JATOS/customized-home-page-template/blob/main/foobar-university-welcome.html).

![template customized home page](/img/v39x/screenshot-branding.png)

You can update your welcome block at any time to add new information (e.g., announcement of JATOS maintenance work). However, since the HTML is cached, it can take **up to an hour to be visible to your users**. If you want to see it right away for testing, you can disable caching in your browser.

This welcome block can be fetched from **any HTTP server** that is able to serve HTML. One way is to do it via GitHub.

### With GitHub

1. Go to [https://github.com/JATOS/customized-home-page-template](https://github.com/JATOS/customized-home-page-template)
2. Click the 'Use this template' button to create a copy of this repository.
3. Change the content of `foobar-university-welcome.html` to your needs.
4. Add necessary files (e.g., logo images) to your repository.
5. Configure JATOS: In your JATOS installation folder, edit `conf/jatos.conf` (or `conf/production.conf` in versions < 3.8.3) and add `jatos.brandingUrl`:

   1. Easy but with rate limit (from GitHub):

      ```
      jatos.brandingUrl = "https://raw.githubusercontent.com/my-user/my-repo/main/foobar-university-welcome.html"
      ```

      Remember to change `my-user`, `my-repo`, and `foobar-university-welcome.html`.

   2. Better: use [GitHub Pages](https://docs.github.com/en/github/working-with-github-pages/creating-a-github-pages-site):

      ```
      jatos.brandingUrl = "https://my-user.github.io/my-repo/foobar-university-welcome.html"
      ```

      Remember to change `my-user`, `my-repo`, and `foobar-university-welcome.html`.

6. Restart JATOS.
