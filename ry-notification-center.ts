import { Subject } from "rxjs/Subject"

interface RYObserver {
  name: string
  observer: object
  callback: (notification: RYNotification) => void
}

export interface RYNotification {
  name: string
  params?: any
}

/**
 * @name RYNotificationCenter
 * @description
 *
 * RYNotificationCenter use one subject object to manager notification event in app runtime.
 * Used as Objective-C/Swift KVO mode.
 *
 * @sample
 * import { RYNotificationCenter } from '...'
 * ionViewDidLoad() {
 *   RYNotificationCenter.default.addObserver(this, NotificationKey[NotificationKey.DockerFinishNotification], () => {})
 * }
 *
 * ionViewWillUnload() {
 *   RYNotificationCenter.default.removeObserver(this)
 * }
 * 
 * Author: Ryan
 * Date: 2018-05-03
 */
export class RYNotificationCenter {
  //Singleton implementation
  static default = new RYNotificationCenter()
  private subject = new Subject<RYNotification>()
  private observers: RYObserver[] = []

  private constructor() {
    this.subject.subscribe(notification => {
      for (let ob of this.observers) {
        if (notification.name == ob.name) {
          ob.callback(notification)
        }
      }
    })
  }

  /**
   * Push a notification with name and parameters object.
   *
   * @param {string} name The notificaton name you want to push.
   * @param {any} [params=any] Parameters you want to transmit when notification pushed.
   */
  post(name: string, params?: any) {
    let notification = { name: name, params: params }
    this.subject.next(notification)
  }

  /**
   * Add a observer and callback method for specified notification.
   *
   * @param {object} observer The object you want to observe notification.
   * @param {string} name The notification name you want to observe.
   * @param {(RYNotification)=>void} callback Callback when notificaton is observered.
   */
  addObserver(observer: object, name: string, callback: (notification?: RYNotification) => void) {
    let ob = { name: name, observer: observer, callback: callback }
    this.observers.push(ob)
  }

  /**
   * Remove observer for specified observer or notification name.
   *
   * @param {object} observer Observers you want to remove with the same observer object.
   * @param {string} name Observers you want to remove with the same notificaton name.
   */
  removeObserver(observer: object, name?: string) {
    let finalObservers: RYObserver[] = []
    if (name != undefined) {
      finalObservers = this.observers.filter((value, index, array) => {
        if (value.observer === observer && value.name == name) {
          return false
        } else {
          return true
        }
      })
    } else {
      finalObservers = this.observers.filter((value, index, array) => {
        if (value.observer === observer) {
          return false
        } else {
          return true
        }
      })
    }
    this.observers = finalObservers
  }
}
