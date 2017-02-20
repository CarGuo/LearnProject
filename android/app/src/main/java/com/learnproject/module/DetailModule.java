
package com.learnproject.module;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.Activity;
import android.content.Intent;
import android.text.TextUtils;

import com.learnproject.DetailActivity;


/**
 * 定一个module，用于在RN中可以方便传递和调用
 */
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

    //定义一个方法，让js可以收到参数
    @ReactMethod
    public void getDataFromIntent(Callback successBack, Callback erroBack) {
        try {
            Activity currentActivity = getCurrentActivity();
            String result_text1 = currentActivity.getIntent().getStringExtra("result_text1");//会有对应数据放入
            String result_text2 = currentActivity.getIntent().getStringExtra("result_text2");//会有对应数据放入
            String result_text3 = currentActivity.getIntent().getStringExtra("result_text3");//会有对应数据放入
            String result_text4 = currentActivity.getIntent().getStringExtra("result_text4");//会有对应数据放入
            if (TextUtils.isEmpty(result_text1)) {
                result_text1 = "No Data";
            }
            if (TextUtils.isEmpty(result_text2)) {
                result_text2 = "No Data";
            }
            if (TextUtils.isEmpty(result_text3)) {
                result_text3 = "No Data";
            }
            if (TextUtils.isEmpty(result_text4)) {
                result_text4 = "No Data";
            }
            successBack.invoke(result_text1, result_text2, result_text3, result_text4);
        } catch (Exception e) {
            erroBack.invoke(e.getMessage());
        }
    }


    //定义一个react native 调用的方法
    @ReactMethod
    public void startActivityByRN(String text1, String text2,String text3,String text4) {
        Activity currentActivity = getCurrentActivity();
        if (null != currentActivity) {
            Intent intent = new Intent(currentActivity, DetailActivity.class);
            intent.putExtra("result_text1", text1);
            intent.putExtra("result_text2", text2);
            intent.putExtra("result_text3", text3);
            intent.putExtra("result_text4", text4);
            currentActivity.startActivity(intent);
        }
    }

}
