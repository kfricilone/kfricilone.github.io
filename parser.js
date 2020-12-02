var showdown  = require('showdown');
const fetch = require('node-fetch');

var converter = new showdown.Converter({
  ghCompatibleHeaderId: true,
  ghMentions: true,
});

converter.setFlavor('github');

exports.parse = function(user, name, callback) {
  //https://github.com/kfricilone/taylir
  //https://raw.githubusercontent.com/kfricilone/taylir/master/README.md

  var url = 'https://github.com/' + user + '/' + name;
  var rmUrl = 'https://raw.githubusercontent.com/' + user + '/' + name + '/master/README.md';

  fetch(rmUrl)
    .then(res => res.text())
    .then(body => {
      fetch(url)
        .then(res => res.text())
        .then(descBody => {

          var regex = /<span class="text-gray-dark mr-2" itemprop="about">[\n \t]*[a-zA-Z0-9 _\-.]*[\n \t]*<\/span>/
          var description = ``;

          var result = regex.exec(descBody);
          if (result !== null) {
            description = result[0].replace('<span class="text-gray-dark mr-2" itemprop="about">', '').replace('<\/span>', '').trim();
          }

          let preContent = `
          <!DOCTYPE html>
          <html lang="en-US">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <meta name="theme-color" content="#157878">
              <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
              <title>` + name + `</title>
              <link rel="stylesheet" href="/css/readme.css">
            </head>

            <body>
              <a id="skip-to-content" href="#content">Skip to the content.</a>

              <header class="page-header" role="banner">
                <h1 class="project-name">` + name + `</h1>
                <h2 class="project-tagline">` + description + `</h2>
                  <a href="` + url + `" class="btn">View on GitHub</a>
                  <a href="` + url + `/zipball/master" class="btn">Download .zip</a>
                  <a href="` + url + `/tarball/master" class="btn">Download .tar.gz</a>
              </header>

              <main id="content" class="main-content" role="main">
                <div class="border">
            `;

          let postContent = `
                </div>
              </main>
            </body>
          </html>`;

          var html = converter.makeHtml(body);

          regex = /\/><br \/>/g;
          html = html.replace(regex, '/>');

          regex = /a><br \/>/g;
          html = html.replace(regex, 'a>');

          callback(preContent + html + postContent);

        });
    });

}
