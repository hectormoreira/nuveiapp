import { View, Text } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native";
import WebView from "react-native-webview";
import { TouchableOpacity } from "react-native";

export default function AddCard() {
  function onMessage(data) {
    alert(data.nativeEvent.data);
  }

  function sendDataToWebView() {
    // webviewRef.current.postMessage("Data from React Native App");
    // webviewRef.current.postMessage(customHTML);
  }

  const webviewRef = useRef();

  const customHTML = `
    <body>
        <script src="https://cdn.paymentez.com/ccapi/sdk/payment_sdk_stable.min.js" charset="UTF-8"></script>

        <style>
  #payment_example_div {
    max-width: 600px;
    min-width: 400px;
    margin: 10 auto;
  }

  #payment_example_div > * {
    margin: 10 auto;
  }

  .tok_btn:hover {
    cursor: pointer;
  }

  .tok_btn:disabled, #tok_btn[disabled] {
    opacity: .65;
    cursor: not-allowed;
  }

  .tok_btn {
    background: linear-gradient(to bottom, rgba(140, 197, 65, 1) 0%, rgba(20, 167, 81, 1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    color: #fff;
    width: 80%;
    border: 1px solid rgba(46, 86, 153, 0.0980392);
    border-bottom-color: rgba(46, 86, 153, 0.4);
    border-top: 0;
    border-radius: 4px;
    font-size: 17px;
    text-shadow: rgba(46, 86, 153, 0.298039) 0px -1px 0px;
    line-height: 34px;
    -webkit-font-smoothing: antialiased;
    font-weight: bold;
    display: block;
  }

  #retry_btn {
    display: none;
  }
</style>

    <div id='payment_example_div'>
    <div id='tokenize_example'></div>
    <div id="response"></div>
    <button id='tokenize_btn' class='tok_btn'>Save card</button>
    <button id='retry_btn' class='tok_btn' display='none'>Save new card</button>
    </div>

    <script>
  // Execute immediately
  (function () {
    // === Variable to use ===
    let environment = 'stg';
    let application_code = 'XYZ-XY-CLIENT';  // Provided by Payment Gateway
    let application_key = 'AAAAAAAAAAAAAAAAABBBBBBBB';  // Provided by Payment Gateway
    let submitButton = document.querySelector('#tokenize_btn');
    let retryButton = document.querySelector('#retry_btn');
    let submitInitialText = submitButton.textContent;

    // Get the required additional data to tokenize card
    let get_tokenize_data = () => {
      let data = {
        locale: 'en',
        user: {
          id: String(Math.floor((new Date).getTime() / 1000)),
          email: 'jhon@doe.com',
        },
        configuration: {
          default_country: 'COL'
        },
      }
      return data
    }

    // === Required callbacks ===
    // Executed when was called 'tokenize' function but the form was not completed.
    let notCompletedFormCallback = message => {
        console.log(message)
      document.getElementById('response').innerHTML = "Not completed form: "+ message + ", Please fill required data";
      submitButton.innerText = submitInitialText;
      submitButton.removeAttribute('disabled');
    }

    // Executed when was called 'tokenize' and the services response successfully.
    let responseCallback = response => {
      // Example of success tokenization.
      //   {
      //    "card": {
      //     "bin": "411111",
      //     "status": "valid",
      //     "token": "2508629432271853872",
      //     "message": "",
      //     "expiry_year": "2033",
      //     "expiry_month": "12",
      //     "transaction_reference": "RB-143809",
      //     "type": "vi",
      //     "number": "1111"
      //   }
      // }

      // Example of failed tokenization. The error format is always the same, only the value of type, help, description changes.
      // {
      //    "error": {
      //       "type": "Card already added: 2508629432271853872",
      //       "help": "If you want to update the card, first delete it",
      //       "description": "{}"
      //    }
      // }
      document.getElementById('response').innerHTML = JSON.stringify(response);
      retryButton.style.display = 'block';
      submitButton.style.display = 'none';
    }

    // 2. Instance the [PaymentGateway](#PaymentGateway-class) with the required parameters.
    let pg_sdk = new PaymentGateway(environment, application_code, application_key);

    // 3. Generate the tokenization form with the required data. [generate_tokenize](#generate_tokenize-function)
    // At this point it's when the form is rendered on page.
    pg_sdk.generate_tokenize(get_tokenize_data(), '#tokenize_example', responseCallback, notCompletedFormCallback);

    // 4. Define the event to execute the [tokenize](#tokenize-function) action.
    submitButton.addEventListener('click', event => {
      document.getElementById('response').innerHTML = '';
      submitButton.innerText = 'Card Processing...';
      submitButton.setAttribute('disabled', 'disabled');
      pg_sdk.tokenize();
      event.preventDefault();
    });
    // };

    // You can define a button to create a new form and save new card
    retryButton.addEventListener('click', event => {
      // re call function
      submitButton.innerText = submitInitialText;
      submitButton.removeAttribute('disabled');
      retryButton.style.display = 'none';
      submitButton.style.display = 'block';
      pg_sdk.generate_tokenize(get_tokenize_data(), '#tokenize_example', responseCallback, notCompletedFormCallback);
    });

  })();

</script>

        
     </body>`;

  return (
    // <View style={{ flex: 1 }}>
    //   <WebView
    //     originWhitelist={["*"]}
    //     source={{ uri: "https://reactnative.dev/" }}
    //   />
    //   {/* <WebView
    //     originWhitelist={["*"]}
    //     source={{ html: "<h1>Hello world</h1>" }}
    //   /> */}
    // </View>

    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        {/* <TouchableOpacity
          onPress={() => sendDataToWebView()}
          style={{
            padding: 20,
            width: 300,
            marginTop: 100,
            backgroundColor: "#6751ff",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>
            Send Data To WebView / Website
          </Text>
        </TouchableOpacity> */}
      </View>
      <WebView
        style={{
          padding: 0,
          width: 320,
          marginTop: 100,
          //   backgroundColor: "#6751ff",
          alignItems: "center",
        }}
        ref={webviewRef}
        scalesPageToFit={false}
        mixedContentMode="always"
        onMessage={onMessage}
        source={{
          html: customHTML,
        }}
      />
    </SafeAreaView>
  );
}
