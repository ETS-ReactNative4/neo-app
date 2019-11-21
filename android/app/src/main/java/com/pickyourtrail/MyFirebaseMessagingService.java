package com.pickyourtrail;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.webengage.sdk.android.WebEngage;
import java.util.Map;
import io.invertase.firebase.messaging.RNFirebaseMessagingService;
import com.freshchat.consumer.sdk.Freshchat;

 public class MyFirebaseMessagingService extends FirebaseMessagingService {
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
      if (Freshchat.isFreshchatNotification(remoteMessage)) {
        Freshchat.handleFcmMessage(this, remoteMessage);
      } else {
        Map<String, String> data = remoteMessage.getData();
        if (data != null) {
            if (data.containsKey("source") && "webengage".equals(data.get("source"))) {
                WebEngage.get().receive(data);
            } else {
                new RNFirebaseMessagingService().onMessageReceived(remoteMessage);
            }
        }
      }
    }

    @Override
    public void onNewToken(String s) {
        super.onNewToken(s);
        WebEngage.get().setRegistrationID(s);
    }
}
