'use strict';

var FORMAT_NAME = 'txt';

/******************************************************************************************
 * Parses captions in plain text format
 ******************************************************************************************/
function parse(content, options) {
  var captions = [];
  var parts = content.split(/\r?\n/g);
  for (var i = 0; i < parts.length; i++) {
    var caption = {};
    if (parts[i].startsWith('# Exported by ')) {
      caption.type = 'meta';
    } else {
      caption.type = 'caption';
    }
    caption.index = i + 1;
    caption.start = i;
    caption.end = i + 1;
    caption.duration = 1;
    caption.content = parts[i];
    caption.text = caption.content;
    captions.push(caption);
  }
  return captions;
}

/******************************************************************************************
 * Builds captions in plain text format
 ******************************************************************************************/
function build(captions, options) {
  var sub = '';
  var eol = options.eol || '\r\n';
  for (var i = 0; i < captions.length; i++) {
    var caption = captions[i];
    if (typeof caption.type === 'undefined' || caption.type == 'caption') {
      sub += caption.text + eol;
      continue;
    }

    if (options.verbose) {
      console.log('SKIP:', caption);
    }
  }

  return sub;
}

/******************************************************************************************
 * Detects a subtitle format from the content.
 ******************************************************************************************/
function detect(content) {
  if (typeof content === 'string') {
    return FORMAT_NAME;
  }
}

/******************************************************************************************
 * Export
 ******************************************************************************************/
module.exports = {
  name: FORMAT_NAME,
  detect: detect,
  parse: parse,
  build: build,
};
