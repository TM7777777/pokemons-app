// kostyl for gh-pages spa

const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build');
const indexPath = path.join(buildDir, 'index.html');
const notFoundPath = path.join(buildDir, '404.html');

fs.copyFileSync(indexPath, notFoundPath);

let notFoundContent = fs.readFileSync(notFoundPath, 'utf8');

const scriptToAdd = `
<script>
  (function() {
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== location.pathname) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
`;

notFoundContent = notFoundContent.replace('</body>', scriptToAdd + '</body>');

fs.writeFileSync(notFoundPath, notFoundContent, 'utf8');
