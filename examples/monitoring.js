  var _url_val = null;
  var origin = window.location.href;
  var url = origin.split('/')[origin.split('/').length - 1];

  $().ready(function() {
      chrome.storage.sync.get(['_url_val', 'slingInfo', 'systemInfo', 'isInstance'], function(items) {
          _url_val = items._url_val;
        if(items.isInstance.indexOf('true')!=-1){
            getInfo(items.slingInfo);
            getInfo(items.systemInfo);
          $('.isInstance').show();
         }

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

    $('#openPage').click(function(){
      chrome.tabs.create({url: "./examples/query_1.html"});
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
      }else if("i18n".indexOf(actions) != -1){
          _url = _url_val + "/libs/cq/i18n/translator.html";
      }
      var createProperties = { url: _url };
      chrome.tabs.create(createProperties);
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
  function getInfo(html, callback, preventSuccessMessage) {
    $('body .content > .container-fluid').append(html);             
  }