/* ============================================================================
   OneBrain — dropzone enhancer (zero dependency)
   Progressive enhancement for file upload. Markup ships a real, accessible
   <input type="file"> inside a .dropzone[data-dropzone]; this wires:
     - click / Enter / Space on the zone -> opens the native picker
     - drag-over highlight (.is-drag) + drop
     - a rendered file list (.dz-files) with size + remove, kept in sync with
       the input's FileList via DataTransfer
   No JS -> the bare <input type="file"> still works (the label is clickable).

   SECURITY: file .name / formatted size go through textContent only; the one
   innerHTML use is a static, developer-controlled <use> icon string.

   Mirrors the conventions in cyber-select.js / accent-picker.js.
   ============================================================================ */
(function () {
  'use strict';

  var ICON_X =
    '<svg class="ob-icon ob-icon-16" aria-hidden="true"><use href="../assets/icons.svg#ob-x"/></svg>';

  function fmtSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function enhance(zone) {
    var input = zone.querySelector('input[type="file"]');
    if (!input) return;

    // a list element right after the zone (create one if absent)
    var list = zone.parentNode.querySelector('[data-dz-files]');
    if (!list) {
      list = document.createElement('ul');
      list.className = 'dz-files';
      list.setAttribute('data-dz-files', '');
      zone.parentNode.insertBefore(list, zone.nextSibling);
    }

    // make the zone keyboard-operable like a button (the inner <input> stays
    // the real control + accessible name)
    if (!zone.hasAttribute('tabindex')) zone.setAttribute('tabindex', '0');
    zone.setAttribute('role', 'button');

    // mirror the current FileList back onto the input so form submit carries it
    function sync(files) {
      var dt = new DataTransfer();
      for (var i = 0; i < files.length; i++) dt.items.add(files[i]);
      input.files = dt.files;
      render();
    }

    function render() {
      list.textContent = '';
      var files = input.files;
      for (var i = 0; i < files.length; i++) {
        (function (file) {
          var li = document.createElement('li');
          li.className = 'dz-file';

          var ic = document.createElement('span');
          ic.className = 'dz-ic';
          ic.innerHTML =
            '<svg class="ob-icon ob-icon-16" aria-hidden="true"><use href="../assets/icons.svg#ob-summarize"/></svg>';

          var name = document.createElement('span');
          name.className = 'dz-name';
          name.textContent = file.name;

          var size = document.createElement('span');
          size.className = 'dz-size';
          size.textContent = fmtSize(file.size);

          var rm = document.createElement('button');
          rm.type = 'button';
          rm.className = 'dz-remove';
          rm.setAttribute('aria-label', 'Remove ' + file.name);
          rm.innerHTML = ICON_X;
          rm.addEventListener('click', function (e) {
            e.stopPropagation();
            var keep = [];
            for (var j = 0; j < input.files.length; j++) {
              if (input.files[j] !== file) keep.push(input.files[j]);
            }
            sync(keep);
          });

          li.appendChild(ic);
          li.appendChild(name);
          li.appendChild(size);
          li.appendChild(rm);
          list.appendChild(li);
        })(files[i]);
      }
    }

    // open picker from the zone (but not when clicking the native input itself)
    zone.addEventListener('click', function (e) {
      if (e.target === input) return;
      input.click();
    });
    zone.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        input.click();
      }
    });

    input.addEventListener('change', render);

    // drag + drop
    ['dragenter', 'dragover'].forEach(function (ev) {
      zone.addEventListener(ev, function (e) {
        e.preventDefault();
        zone.classList.add('is-drag');
      });
    });
    ['dragleave', 'dragend'].forEach(function (ev) {
      zone.addEventListener(ev, function (e) {
        if (ev === 'dragleave' && zone.contains(e.relatedTarget)) return;
        zone.classList.remove('is-drag');
      });
    });
    zone.addEventListener('drop', function (e) {
      e.preventDefault();
      zone.classList.remove('is-drag');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
        // append to whatever is already chosen unless input is single
        var merged = [];
        var k;
        if (input.multiple) {
          for (k = 0; k < input.files.length; k++) merged.push(input.files[k]);
        }
        for (k = 0; k < e.dataTransfer.files.length; k++) merged.push(e.dataTransfer.files[k]);
        sync(input.multiple ? merged : [e.dataTransfer.files[0]]);
      }
    });

    render();
  }

  function init() {
    var zones = document.querySelectorAll('.dropzone[data-dropzone]');
    for (var i = 0; i < zones.length; i++) enhance(zones[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
