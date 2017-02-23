
package com.learnproject.module;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.Activity;
import android.content.Intent;
import android.support.annotation.Nullable;
import android.text.TextUtils;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.learnproject.DetailActivity;
import com.learnproject.MainActivity;
import com.learnproject.R;
import com.learnproject.SingleActivity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


/**
 * 定一个module，用于在RN中可以方便传递和调用
 */
public class DetailModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private final ReactApplicationContext reactContext;

    //保存打开的activity，js里的回调接口
    private List<Callback> successCallBack = new ArrayList<>();

    public DetailModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        //注册activity的打开和返回监听，用于activity返回的时候回调
        reactContext.addActivityEventListener(this);
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
    public void startActivityByRN(final String text1, final String text2, final String text3, final String text4,
                                  final Callback successBack, final Callback errorBack) {
        successCallBack.add(successBack);
        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity) {
                Intent intent = new Intent(currentActivity, DetailActivity.class);
                intent.putExtra("result_text1", text1);
                intent.putExtra("result_text2", text2);
                intent.putExtra("result_text3", text3);
                intent.putExtra("result_text4", text4);
                intent.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
                //currentActivity.startActivityForResult(intent, 1100);
                currentActivity.startActivity(intent);
            }
        } catch (Exception e) {
            e.printStackTrace();
            errorBack.invoke(e.getMessage());
        }

    }

    //定义一个react native 调用的方法
    @ReactMethod
    public void startActivitySingle(final Callback successBack, final Callback errorBack) {
        successCallBack.add(successBack);
        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity) {
                Intent intent = new Intent(currentActivity, SingleActivity.class);
                currentActivity.startActivity(intent);
            }
        } catch (Exception e) {
            e.printStackTrace();
            errorBack.invoke(e.getMessage());
        }

    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

        if (resultCode == Activity.RESULT_OK && requestCode == 1100) {
            if (data != null) {
                String result = data.getStringExtra("result");
                if (!TextUtils.isEmpty(result)) {
                    callLogic(result);
                } else {
                    callLogic("无数据传回");
                }
            } else {
                callLogic("无数据传回");
            }

            WritableMap params = Arguments.createMap();
            HashMap<String, String> hashMap = new HashMap<>();
            params.putString("result", "我是通过Detail消息推送过来的！");
            sendEvent(reactContext, "backFromDetail", params);
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    //输出回调
    private void callLogic(String string) {
        if (successCallBack.size() > 0) {
            successCallBack.get(successCallBack.size() - 1).invoke(string);
            successCallBack.remove(successCallBack.size() - 1);
        }
    }

}
