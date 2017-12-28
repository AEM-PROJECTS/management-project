var SLING_INFO = 'http://localhost:4502/system/console/status-slingsettings.json',
SYSTEM_INFO             = 'http://localhost:4502/system/console/status-System%20Properties.json';

  getInfo(SLING_INFO);
 getInfo2(SYSTEM_INFO);




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
            var array_ =  convertSlingArrayToObject(data);
            var html = "<pre>";
            html += "<b>java.runtime.name: </b>"+ array_["java.runtime.name"]+"<br>";
            html += "<b>java.runtime.version: </b>"+array_["java.runtime.version"]+"<br>";
            html +=  "<b>java.vendor: </b>"+array_["java.vendor"]+"<br>";
            html += "<b>os.name: </b>"+array_["os.name"]+"<br>";
            html += "<b>os.version: </b>"+array_["os.version"]+"<br></pre>";
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
            var array_ =  convertSlingArrayToObject(data);
            var html = "<pre>";
            html += "<b>Sling ID: </b>"+ array_["Sling ID"]+"<br>";
            html += "<b>Sling Name: </b>"+array_["Sling Name"]+"<br>";
            html +=  "<b>Sling Home: </b>"+array_["Sling Home"]+"<br>";
            html += "<b>Sling Home URL: </b>"+array_["Sling Home URL"]+"<br>";
            html += "<b>Run Modes: </b>"+array_["Run Modes"]+"<br></pre>";
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
