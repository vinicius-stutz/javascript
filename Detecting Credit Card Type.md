## Detecting Credit Card Type

The interesting thing about the  IIN  is that it also determines the type of credit card. Here are some common  IIN  patterns:

-   MasterCard IINs have the first two digts in the range 51-55
-   Visa IINs always begin with a 4
-   American Expression IINs always begin with 34 or 37

Knowing this, it’s possible to write a simple JavaScript function to determine the type of credit card given an account number.

```
function getCreditCardType(accountNumber){

  //start without knowing the credit card type
  var result = "unknown";

  //first check for MasterCard
  if (/^5[1-5]/.test(accountNumber))
  {
    result = "mastercard";
  }

  //then check for Visa
  else if (/^4/.test(accountNumber))
  {
    result = "visa";
  }

  //then check for AmEx
  else if (/^3[47]/.test(accountNumber))
  {
    result = "amex";
  }

  return result;
}
```

This function makes extensive use of regular expressions to verify the credit card type. The  `accountNumber`  argument should be a string (the same as the value of the text input field you’ll be evaluating). You can use  `getCreditCardType()`  like this:

```
var type = getCreditCardType("5555-5555-5555-4444");

switch (type)
{
  case "mastercard":
    //show MasterCard icon
    break;

  case "visa":
    //show Visa icon
    break;

  case "amex":
    //show American Express icon
    break;

  default:
    //don't do anything
}
```

Keep in mind that the  `getCreditCardType()`  function looks at only the first few digits, and so works both when there are dashes in the account number and when there are not.

The only thing left to do is tie this functionality into a form. To do so, listen for both the  `keyup`  and  `blur`  events. You need to listen to both because users will either type their credit card number or will paste it in. In the latter case,  `keyup`  will never fire and you won’t get the credit card detection.

```
function handleEvent(event)
{
  var value   = event.target.value,    
      type    = getCreditCardType(value);

  switch (type)
  {
    case "mastercard":
        //show MasterCard icon
        break;

    case "visa":
        //show Visa icon
        break;

    case "amex":
        //show American Express icon
        break;

    default:
        //clear all icons?
        //show error?
  }
}

// or window.onload
document.addEventListener("DOMContentLoaded", function(){
  var textbox = document.getElementById("cc-num");
  textbox.addEventListener("keyup", handleEvent, false);
  textbox.addEventListener("blur", handleEvent, false);
}, false);
```

This code assumes a textbox with an  ID  of  `cc-num`  exists on the page. Using the  DOMLevel 2  `addEventListener()`  method, a  `DOMContentLoaded`  event handler sets up the rest of the event handlers for the page. In a full web application, you would include this code wherever you initialize other event handlers. The  `keyup`  and  `blur`  events are assigned to call  `handleEvent()`. Inside of  `handleEvent()`, the current value of the textbox is retrieved via  `event.target.value`  and passed to the  `getCreditCardType()`  function. Once the type is determined, appropriate changes to the user interface are made.

## What About Security?

Client-side validation is designed as a convenience to the user, not as a security precaution for your system. Auto-detecting the credit card type in this manner gives no indication as to whether or not the credit card number as a whole is valid. The server should be both auto-detecting the credit card type using the same algorithm as well as validating whether or not the credit card number is valid. Merchant systems typically do both of these checks for you.

Another aspect to keep in mind: if you’re not auto-detecting all credit card types that you accept, be sure to have a way for the user to specify the card type. Amazon displays a dropdown box of available credit card types if it fails to determine the type by looking at the credit card number alone. GitHub, on the other hand, auto-detects all credit card types that it accepts.

## Simpler Forms = Faster Checkout

It’s a widely-accepted principle that simpler forms are better forms. Anytime you can make a form easier to fill out, you should definitely take the opportunity to do so. In the case of credit cards, we’ve been asking users to provide redundant information for so long that we tend to accept the status quo. Amazon and GitHub are definitely first-movers in this area, but I expect to see more sites adopt auto-detecting of credit card types in their forms.
