const paymentScript = fields => {
  return `
  function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }

  function createInputField(name, value) {
    var $input = document.createElement("input");
    $input.type = "text";
    $input.name = name;
    $input.value = value;
    $formElement.appendChild($input);
  }

  var fields = ${JSON.stringify(fields)};
  var $formElement = document.getElementById('paymentForm');
  var submitUrl = "";
  if(!isEmpty(fields)) {
    submitUrl = fields.url;
    delete fields.url;
    
    for (var field in fields) {
      if (fields.hasOwnProperty(field)) {
        if(typeof fields[field] === 'object') {
          var innerFields = fields[field];
          for (var innerField in innerFields) {
            if(innerFields.hasOwnProperty(innerField)) {
              createInputField(field + "[" + innerField + "]", innerFields[innerField]);
            }
          }
        } else {
          createInputField(field, fields[field]);
        }
      }
    }
    
    $formElement.action = submitUrl;
    $formElement.submit();
  }
  `;
};

/*
const paymentScript = ({
  hash,
  transactionId,
  amount,
  productInfo,
  firstName,
  lastName,
  email,
  phoneNumber,
  address1,
  address2,
  city,
  state,
  country,
  zipCode,
  userDefinedOne,
  userDefinedTwo,
  userDefinedThree,
  userDefinedFour,
  userDefinedFive,
  paymentEnvironment,
  merchantId,
  url,
  successUrl,
  failureUrl,
  cancelUrl
}) => {
  return `
  localStorage.setItem("mobileAppDetails", true);
  var $payUForm = document.querySelector('#payUPaymentForm');
  $payUForm.action = "${url}";
  var $key = document.querySelector('#key');
  $key.value = "${merchantId}";
  var $hash = document.querySelector('#hash');
  $hash.value = "${hash}";
  var $txnId = document.querySelector('#txnid');
  $txnId.value = "${transactionId}";
  var $amount = document.querySelector('#amount');
  $amount.value = "${amount}";
  var $email = document.querySelector('#email');
  $email.value = "${email}";
  var $productinfo = document.querySelector('#productinfo');
  $productinfo.value = "${productInfo}";
  var $surl = document.querySelector('#surl');
  $surl.value = "${successUrl}";
  var $furl = document.querySelector('#furl');
  $furl.value = "${failureUrl}";
  var $firstname = document.querySelector('#firstname');
  $firstname.value = "${firstName}";
  var $lastname = document.querySelector('#lastname');
  $lastname.value = "${lastName}";
  var $curl = document.querySelector('#curl');
  $curl.value = "${cancelUrl}";
  var $address1 = document.querySelector('#address1');
  $address1.value = "${address1}";
  var $address2 = document.querySelector('#address2');
  $address2.value = "${address2}";
  var $city = document.querySelector('#city');
  $city.value = "${city}";
  var $state = document.querySelector('#state');
  $state.value = "${state}";
  var $country = document.querySelector('#country');
  $country.value = "${country}";
  var $zipcode = document.querySelector('#zipcode');
  $zipcode.value = "${zipCode}";
  var $udf1 = document.querySelector('#udf1');
  $udf1.value = "${userDefinedOne}";
  var $udf2 = document.querySelector('#udf2');
  $udf2.value = "${userDefinedTwo}";
  var $udf3 = document.querySelector('#udf3');
  $udf3.value = "${userDefinedThree}";
  var $udf4 = document.querySelector('#udf4');
  $udf4.value = "${userDefinedFour}";
  var $udf5 = document.querySelector('#udf5');
  $udf5.value = "${userDefinedFive}";
  $payUForm.submit();
`;
};
*/

/**
 * XHR Form submit (causes CORS hence unusable)
 */
/*
var payUFormData = new FormData();
payUFormData.append("key", "${merchantId}");
payUFormData.append("hash", "${hash}");
payUFormData.append("txnId", "${transactionId}");
payUFormData.append("amount", "${amount}");
payUFormData.append("email", "${email}");
payUFormData.append("productInfo", "${productInfo}");
payUFormData.append("surl", "${successUrl}");
payUFormData.append("furl", "${failureUrl}");
payUFormData.append("firstname", "${firstName}");
payUFormData.append("lastname", "${lastName}");
payUFormData.append("curl", "${cancelUrl}");
payUFormData.append("address1", "${address1}");
payUFormData.append("address2", "${address2}");
payUFormData.append("city", "${city}");
payUFormData.append("state", "${state}");
payUFormData.append("country", "${country}");
payUFormData.append("zipcode", "${zipCode}");
payUFormData.append("udf1", "${userDefinedOne}");
payUFormData.append("udf2", "${userDefinedTwo}");
payUFormData.append("udf3", "${userDefinedThree}");
payUFormData.append("udf4", "${userDefinedFour}");
payUFormData.append("udf5", "${userDefinedFive}");
payUFormData.append("phone", "${phoneNumber}");

var request = new XMLHttpRequest();
request.open("POST", "${url}");

request.onreadystatechange = function() {
  if (request.readyState == 4 && request.status == 200) {
    document.open();
    document.write(request.responseText);
  }
}

request.send(payUFormData);
*/

export default paymentScript;
