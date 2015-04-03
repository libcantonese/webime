var preedit = '';
var candidates = [];
var offset = 0;
var enmode = false;

function convert(s) {
  if (s in jyutping0) {
    candidates = jyutping0[s];
  } else {
    candidates = [];
  }
  offset = 0;
  show_candidates();
}

function show_candidates() {
  var maxlen = candidates.length - offset
  var len = Math.min(10, maxlen);
  var content = '';
  content += '<ol>';
  for (var i = 0; i < len; i++) {
    if (i < 9) {
      content += '<li>';
    } else {
      content += '<li value="0">';
    }
    content += candidates[offset+i];
    content += '</li>';
  }
  // keep candidates box's height constant
  for (var i = len; i < 10; i++) {
    content += '<li style="visibility: hidden"></li>';
  }
  content += '</ol>';
  $('#candidates').html(content);
}

$('#edit').keydown(function(event) {
  if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
    return true;
  } else if (186 <= event.keyCode && event.keyCode <= 192) { // punctuations
    return true;
  } else if (219 <= event.keyCode && event.keyCode <= 222) { // punctuations
    return true;
  } else if (enmode) {
    return true;
  } else if (65 <= event.keyCode && event.keyCode <= 90) { // A-Z
    preedit += String.fromCharCode(event.keyCode).toLowerCase();
    $('#preedit').val(preedit);
    convert(preedit);
  } else if (event.keyCode == 8) { // delete
    if (preedit.length > 0) {
      preedit = preedit.substring(0, preedit.length - 1);
      $('#preedit').val(preedit);
      convert(preedit);
    } else {
      candidates = [];
      offset = 0;
      show_candidates();
      var edit = $('#edit').val();
      edit = edit.substring(0, edit.length - 1);
      $('#edit').val(edit);
    }
  } else if (0x30 <= event.keyCode && event.keyCode <= 0x39) { // 0-9
    var select = event.keyCode - 0x30 - 1;
    if (select === -1) {
      select = 9;
    }
    var edit = $('#edit').val();
    if (candidates.length === 0) {
      $('#edit').val(edit + (event.keyCode-0x30).toString());
    } else if (offset + select < candidates.length) {
      $('#edit').val(edit + candidates[offset+select]);
      preedit = '';
      $('#preedit').val(preedit);
      candidates = [];
      offset = 0;
      show_candidates();
    }
  } else if (event.keyCode === 0x20) {
    if (candidates.length > 0) {
      offset += 10;
      if (offset >= candidates.length) {
        offset = 0;
      }
      show_candidates();
    } else {
      var edit = $('#edit').val();
      $('#edit').val(edit + ' ');
    }
  } else {
    console.log(event.keyCode);
  }
  event.preventDefault();
  return false;
});

$('#preedit').click(function(event){
  $('#edit').focus();
  event.preventDefault();
  return false;
});
$('#selectall').click(function(event){
  $('#edit').select();
  event.preventDefault();
  return false;
});
$('#ecswitch').click(function(event){
  if (enmode) {
    $('#ecswitch').html('廣');
  } else {
    $('#ecswitch').html('En');
  }
  enmode = !enmode;
  $('#edit').focus();
  event.preventDefault();
  return false;
});
$('#config').click(function(event){
  $('#edit').focus();
  event.preventDefault();
  return false;
});
$('#usage').click(function(event){
  $('#edit').focus();
  event.preventDefault();
  return false;
});
$('#candidates').click(function(event){
  $('#edit').focus();
  event.preventDefault();
  return false;
});

$('#edit').focus();
