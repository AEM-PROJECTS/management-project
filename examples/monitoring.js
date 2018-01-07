  var SLING_INFO = '/system/console/status-slingsettings.json',
      SYSTEM_INFO = '/system/console/status-System%20Properties.json';
  var _url_val = null;
  var origin = window.location.href;
  var url = origin.split('/')[origin.split('/').length - 1];

  $().ready(function() {
      chrome.storage.sync.get({ '_url_val': _url_val }, function(items) {
          _url_val = items._url_val;
          getInfo(_url_val + SLING_INFO);
          getInfo2(_url_val + SYSTEM_INFO);
      });

      setTimeout(function() {
          chrome.storage.sync.get(['last_page', 'last_page_flag'], function(items) {
              if (items.last_page_flag == 'false' && items.last_page && (url != items.last_page)) {
                  window.location.href = origin.replace(url, items.last_page);
              }
              chrome.storage.sync.set({ 'last_page': 'monitoring.html', 'last_page_flag': 'true' }, function() {});
          });
      }, 1000);


      $('a').click(function() {
          var _key = $(this).data("querystring-key");
          var _val = $(this).data("querystring-value");

          if ("logs".indexOf(_key) != -1) {
              toggleLog(_val);
          }
      });

  });

  function toggleLog(actions) {
      var _url = null;
      if ("full_log".indexOf(actions) != -1) {
          _url = _url_val + "/system/console/slinglog/";
      } else if ("last_log".indexOf(actions) != -1) {
          _url = _url_val + "/system/console/slinglog/slinglog/tailer.txt?tail=200&grep=*&name=%2Flogs%2Ferror.log";
      } else if ("monitoring".indexOf(actions) != -1) {
          _url = _url_val + "/libs/granite/operations/content/monitoring/page.html";
      }
      var createProperties = { url: _url };
      chrome.tabs.create(createProperties);
  }






  /**
   * Converts an array of strings with key value pairs separated by an
   * equals sign.
   *
   * Certain responses with JSON Sling selectors to the Felix console returns
   * this proprietary format.
   *
   * @param {Array} array of strings
   * @returns {JSON} JSON object created from array
   */
  function convertSlingArrayToObject(slingArray) {
      var SEPARATOR = ' = ',
          slingObject = {},
          tmp,
          x;

      for (x = 0; x < slingArray.length; x++) {
          tmp = slingArray[x].split(SEPARATOR);
          slingObject[tmp[0]] = tmp[1];
      }

      return slingObject;
  }




  function getInfo2(url, callback, preventSuccessMessage) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
          var responseText,
              data;

          if (xmlhttp.readyState === 4) {
              if (xmlhttp.status === 200) {

                  if (!preventSuccessMessage) {
                      /* Escape backslashes for Windows servers. */
                      responseText = xmlhttp.responseText;
                      responseText = responseText.replace(/\\/g, '\\\\');

                      data = JSON.parse(responseText);
                      var array_ = convertSlingArrayToObject(data);
                      var html = "<b>System info</b><pre>";
                      html += "<b>java.runtime.name: </b>" + array_["java.runtime.name"] + "<br>";
                      html += "<b>java.runtime.version: </b>" + array_["java.runtime.version"] + "<br>";
                      html += "<b>java.vendor: </b>" + array_["java.vendor"] + "<br>";
                      html += "<b>os.name: </b>" + array_["os.name"] + "<br>";
                      html += "<b>os.version: </b>" + array_["os.version"] + "<br></pre>";
                      $('body .content').append(html);
                      return data;
                  } else {
                      data = xmlhttp.responseText;
                  }

                  if (callback) {
                      callback(data);
                  }
              } else {
                  return null;
              }
          }
      };

      xmlhttp.open('GET', url, true);
      xmlhttp.send();
  }



  /**
   * Get info and send a Chrome message.
   *
   * @private
   * @param {String} Type of message to send.
   * @param {String} URL to query the JCR.
   * @param {Function} Callback function.
   * @param {Boolean} preventSuccessMessage  
   */
  function getInfo(url, callback, preventSuccessMessage) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
          var responseText,
              data;

          if (xmlhttp.readyState === 4) {
              if (xmlhttp.status === 200) {

                  if (!preventSuccessMessage) {
                      /* Escape backslashes for Windows servers. */
                      responseText = xmlhttp.responseText;
                      responseText = responseText.replace(/\\/g, '\\\\');

                      data = JSON.parse(responseText);
                      var array_ = convertSlingArrayToObject(data);
                      var html = "<b>Instance info</b><pre>";
                      html += "<b>Sling ID: </b>" + array_["Sling ID"] + "<br>";
                      html += "<b>Sling Name: </b>" + array_["Sling Name"] + "<br>";
                      html += "<b>Sling Home: </b>" + array_["Sling Home"] + "<br>";
                      html += "<b>Sling Home URL: </b>" + array_["Sling Home URL"] + "<br>";
                      html += "<b>Run Modes: </b>" + array_["Run Modes"] + "<br></pre>";
                      $('body .content').append(html);
                      return data;
                  } else {
                      data = xmlhttp.responseText;
                  }

                  if (callback) {
                      callback(data);
                  }
              } else {
                  return null;
              }
          }
      };

      xmlhttp.open('GET', url, true);
      xmlhttp.send();
  }