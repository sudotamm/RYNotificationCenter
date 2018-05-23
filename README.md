# RYNotificationCenter
Implement NotificationCenter design mode from Objective-C/Swift with typescript.  
Manage multiple event emiters with singleton NotificationCenter to simplify notification push/observe logic. 

### Install with npm 
```
npm install ry-notification-center@latest
```

### How to use
```typescript
  //Add observer in page/component/plugin init method
  ionViewDidLoad() {
    RYNotificationCenter.default.addObserver(this, "NotificationKey", (notification) => {
    // callback when received notification
    })
  }

  //Remove observer in page/component/plugin dealloc method
  ionViewWillUnload() {
    RYNotificationCenter.default.removeObserver(this)
  }
```
