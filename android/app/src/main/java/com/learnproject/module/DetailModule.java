
package com.learnproject.module;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.Activity;
import android.content.Intent;
import com.learnproject.DetailActivity;


/**
 * 定一个module，用于在RN中可以方便传递和调用
 * */
public class DetailModule extends ReactContextBaseJavaModule {

      private final ReactApplicationContext reactContext;

      public DetailModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
      }

      //定义一个module名字
      @Override
      public String getName() {
        return "DetailModule";
      }

      //定义一个react native 调用的方法
      @ReactMethod
      public void startActivityByRN(){
          Activity currentActivity = getCurrentActivity();
          if (null != currentActivity) {
              Intent intent = new Intent(currentActivity, DetailActivity.class);
              currentActivity.startActivity(intent);
          }
      }

}
