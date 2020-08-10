module.exports = function(context) {

  var fs = context.requireCordovaModule('fs'),
    path = context.requireCordovaModule('path');

  var platformRoot = path.join(context.opts.projectRoot, 'platforms/android/app/src/main');
  var manifestFile = path.join(platformRoot, 'AndroidManifest.xml');

  if (fs.existsSync(manifestFile)) {
    fs.readFile(manifestFile, 'utf8', function (err,data) {
      if (err) {
        throw new Error('Unable to find AndroidManifest.xml: ' + err);
      }

      var result;
      if (data.indexOf("android:usesCleartextTraffic") == -1) {
        result = data.replace(/<application/g, '<application android:usesCleartextTraffic="true"');
      } else {
        result = data.replace(/android:usesCleartextTraffic=["']false["']/g, 'android:usesCleartextTraffic="true"');
      }

      fs.writeFile(manifestFile, result, 'utf8', function (err) {
        if (err) throw new Error('Unable to write into AndroidManifest.xml: ' + err);
      });
    });
  } else {
    throw new Error('Unable to find AndroidManifest.xml');
  }
};