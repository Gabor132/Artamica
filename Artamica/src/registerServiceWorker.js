/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.VUE_APP_NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}
// eslint-disable-next-line no-unused-vars
async function checkSubscription() {
  let serviceWorker = await window.navigator.serviceWorker.ready;
  return await serviceWorker.pushManager.getSubscription().then(function(sub) {
    if (sub === null) {
      // Update UI to ask user to register for Push
      console.log("Not subscribed to push service!");
    } else {
      // We have a subscription, update the database
      console.log("Already subscribed to push service");
    }
    return sub !== null;
  });
}

// eslint-disable-next-line no-unused-vars
async function subscribeNotifications() {
  /**let applicationServerKey = await RequestHandler.doGetRequest(
    "/notification/notify/publicKey",
    {}
  ).then(data => {
    return data;
  });**/
  let serviceWorker = await window.navigator.serviceWorker.ready;
  let subscription = await serviceWorker.pushManager
    .subscribe({
      userVisibleOnly: false
    })
    .then(async function(sub) {
      console.log("Got subscription: " + sub);
      return sub;
    })
    .catch(function(e) {
      if (Notification.permission === "denied") {
        // eslint-disable-next-line no-console
        console.warn("Permission for notifications was denied");
      } else {
        // eslint-disable-next-line no-console
        console.error("Unable to subscribe to push", e);
      }
    });
  return subscription;
}

if (process.env.VUE_APP_NODE_ENV === "production") {
  if ("Notification" in window && navigator.serviceWorker) {
    // Display the UI to let the user toggle notifications
    if (Notification.permission === "granted") {
      /* do our magic */
      self.addEventListener("notificationclose", function(e) {
        var notification = e.notification;
        var primaryKey = notification.data.primaryKey;
        console.log("Closed notification: " + primaryKey);
      });
      console.log("Added Event Listener for Notification Close");
      self.addEventListener("notificationclick", function(e) {
        var notification = e.notification;
        // eslint-disable-next-line no-unused-vars
        var primaryKey = notification.data.primaryKey;
        var action = e.action;

        if (action === "close") {
          notification.close();
        } else {
          // eslint-disable-next-line no-undef
          clients.openWindow("http://www.google.com");
          notification.close();
        }
      });
      console.log("Added Event Listener for Notification Click");
      self.addEventListener("push", function(e) {
        var body;
        console.log("Got a push!");
        if (e.data) {
          body = e.data.text();
        } else {
          body = "Push message no payload";
        }
        var options = {
          body: body,
          icon: "images/notification-flat.png",
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
          actions: [
            {
              action: "explore",
              title: "Explore this new world",
              icon: "images/checkmark.png"
            },
            {
              action: "close",
              title: "I don't want any of this",
              icon: "images/xmark.png"
            }
          ]
        };
        e.waitUntil(
          self.registration.showNotification("Push Notification", options)
        );
      });
      console.log("Added Event Listener for Push");
    } else if (Notification.permission === "blocked") {
      /* the user has previously denied push. Can't reprompt. */
      console.log("Notification permission is blocked");
    }
  }
}

export { subscribeNotifications, checkSubscription };
